import React, { useState, useEffect, useRef } from 'react'
import { View, KeyboardAvoidingView, Platform } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import TextInputJobs from '../TextInputJobs/index'
import PickerJobs from '../PickerJobs/index'
import CardJobs from '../CardJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'
import ButtonPurple from '../ButtonPurple/index'

import { white, purple } from '../common/util/colors'

import { formatPhone, formatDate } from '../common/util/functions'

import {
    TextSignUpTitle,
    ViewContainerGotoLogin,
    TextGotoLogin,
    ButtonGotoLogin,
    TextGotoLoginButton,
    ViewContainerRow,
    ViewContainerButton,
    ScrollViewContainerForm
} from './styles'

import { styleSheets } from './styles'

function SignUp(props) {
    const [newRequest, setNewRequest] = useState(false)
    const [invalidField, setInvalidField] = useState('')
    const [genderList, setGenderList] = useState([
        {
            label: 'Masculino',
            value: 'MASCULINO'
        },
        {
            label: 'Feminino',
            value: 'FEMININO'
        },
        {
            label: 'Outro',
            value: 'OUTRO'
        }
    ])
    const [form, setForm] = useState({
        userType: 1,
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        document: '',
        date_birth: '',
        gender: 'MASCULINO'
    })

    const scrollViewRef = useRef()

    useEffect(() => {

    }, [])

    useEffect(() => {
        if (props.signup.isSignup) {
            props.login(props.signup.user.email, props.signup.user.password)
        }
    }, [props.signup.isSignup])

    useEffect(() => {
        if (props.signup.error) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
        }
    }, [props.signup.error])

    useEffect(() => {
        if (props.auth.isAuth) {
            props.ownProps.onPressLogin()
            if (props.auth.userType === 'client')
                props.ownProps.navigation.navigate('CategoriesSearch')
            else
                props.ownProps.navigation.navigate('ProfessionalHome')
        }
        else if (props.auth.error) {
            props.ownProps.onPressLogin()
        }
    }, [props.auth.isAuth, props.auth.error])

    useEffect(() => {
        if (form.date_birth.length > 0) {
            let date_ = formatDate(form.date_birth)
            if (form.date_birth !== date_) {
                setForm({
                    ...form,
                    'date_birth': date_
                })
            }
        }
    }, [form.date_birth])

    useEffect(() => {
        if (form.phone.length > 0) {
            let phone_ = formatPhone(form.phone)
            if (form.phone !== phone_) {
                setForm({
                    ...form,
                    'phone': phone_
                })
            }
        }
    }, [form.phone])

    handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text))
            setInvalidField(name)
        else
            setInvalidField('')
    }

    validateField = (field, value) => {
        switch (field) {
            case 'name':
            case 'document':
                if (value.length === 0)
                    return false
                break
            case 'phone':
                if (value.length < 14)
                    return false
                break
            case 'date_birth':
                if (value.length < 10)
                    return false
                break
            case 'password':
                if (value.length < 5)
                    return false
                break
            case 'confirmPassword':
                if (value !== form.password)
                    return false
                break
            case 'email':
                if (!value.includes('@'))
                    return false
                break
            case 'gender':
                if (value === '' || value === 'SELECIONE')
                    return false
                break
            default:
                break
        }
        return true
    }

    handleClickSignUp = () => {
        if (invalidField !== '')
            return

        let date = form.date_birth.split("/")
        let dateFormatted = date[2] + "-" + date[1] + "-" + date[0]

        let user = {
            ...form,
            date_birth: dateFormatted,
        }
        props.signupRequest(user)
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView>
            <ScrollViewContainerForm ref={(c) => scrollViewRef.current = c}>
                <View style={{ paddingBottom: 50 }}>
                    {(props.signup.isSigningup || props.auth.isLogingin) && <Loading size='large' color={purple} height='330' error={props.signup.error} success={props.signup.isSignup} />}

                    {(!props.signup.isSigningup && !props.auth.isLogingin) && (
                        <CardJobs backColor={white} width='80' height='140' opacity={1}>
                            <TextSignUpTitle>Cadastre-se</TextSignUpTitle>
                            {props.signup.error && <TextError>{props.signup.errorMessage}</TextError>}
                            <View>
                                <CheckBox
                                    title='Oferecer serviços no aplicativo'
                                    checkedColor={purple}
                                    containerStyle={styleSheets.containerCheck}
                                    checked={form.userType === 2}
                                    onPress={() => {
                                        setForm({
                                            ...form,
                                            'userType': form.userType === 2 ? 1 : 2
                                        })
                                    }} />
                                <TextInputJobs
                                    name='name'
                                    onChangeText={handleOnChange}
                                    placeholder='Nome'
                                    invalidValue={invalidField === 'name'} />

                                <TextInputJobs
                                    value={form.phone}
                                    name='phone'
                                    onChangeText={handleOnChange}
                                    placeholder='Telefone'
                                    textContentType='telephoneNumber'
                                    keyboardType='phone-pad'
                                    invalidValue={invalidField === 'phone'} />

                                <TextInputJobs
                                    name='document'
                                    onChangeText={handleOnChange}
                                    keyboardType='number-pad'
                                    placeholder='CPF'
                                    invalidValue={invalidField === 'document'} />

                                <TextInputJobs
                                    value={form.date_birth}
                                    name='date_birth'
                                    onChangeText={handleOnChange}
                                    placeholder='Data de Nascimento'
                                    keyboardType='number-pad'
                                    invalidValue={invalidField === 'date_birth'} />

                                <PickerJobs
                                    selectedValue={form.gender}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setForm({
                                            ...form,
                                            'gender': itemValue
                                        })
                                    }}
                                    itemsList={genderList} />

                                <TextInputJobs
                                    name='email'
                                    onChangeText={handleOnChange}
                                    placeholder='Email'
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    invalidValue={invalidField === 'email'} />

                                <TextInputJobs
                                    name='password'
                                    onChangeText={handleOnChange}
                                    placeholder='Senha'
                                    textContentType='password'
                                    secureTextEntry={true}
                                    invalidValue={invalidField === 'password'} />

                                <TextInputJobs
                                    name='confirmPassword'
                                    onChangeText={handleOnChange}
                                    placeholder='Confirme a Senha'
                                    textContentType='password'
                                    secureTextEntry={true}
                                    invalidValue={invalidField === 'confirmPassword'} />

                                <ViewContainerButton>
                                    <ButtonPurple onPress={handleClickSignUp}>Confirmar</ButtonPurple>
                                </ViewContainerButton>

                                <ViewContainerGotoLogin>
                                    <TextGotoLogin>Já possui cadastro?</TextGotoLogin>
                                    <ButtonGotoLogin onPress={props.ownProps.onPressLogin}>
                                        <TextGotoLoginButton>Fazer Login</TextGotoLoginButton>
                                    </ButtonGotoLogin>
                                </ViewContainerGotoLogin>
                            </View>
                        </CardJobs>
                    )}
                </View>

            </ScrollViewContainerForm>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        signup: state.signup,
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupRequest: (user) => dispatch(ActionCreators.signupRequest(user)),
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)