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

import { formatPhone, formatDate, formatDocumento } from '../common/util/functions'

import {
    TextSignUpTitle,
    ViewContainerGotoLogin,
    TextGotoLogin,
    ButtonGotoLogin,
    TextGotoLoginButton,
    ViewContainerButton,
    ScrollViewContainerForm
} from './styles'

import { styleSheets } from './styles'

function SignUp(props) {
    const [invalidField, setInvalidField] = useState('')
    const [genderList] = useState([
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
    const phoneRef = useRef()
    const documentRef = useRef()
    const dateBirthRef = useRef()
    const emailRef = useRef()
    const passwdRef = useRef()
    const confirmPasswdRef = useRef()

    useEffect(() => {
        console.log('scrollViewRef.current.height => ', scrollViewRef.current)
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

    useEffect(() => {
        if (form.document.length > 0) {
            let doc = formatDocumento(form.document)
            if (form.document !== doc) {
                setForm({
                    ...form,
                    'document': doc
                })
            }
        }
    }, [form.document])

    const handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })

        if (!validateField(name, text)) {
            setInvalidField(name)
        }
        else
            setInvalidField('')
    }

    const validateField = (field, value) => {
        switch (field) {
            case 'name':
                //case 'document':
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

    const showError = (description) => {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
        props.signupError('O campo ' + description + ' está inválido.')
    }

    const handleClickSignUp = () => {
        if (!validateField('name', form.name)) {
            setInvalidField('name')
            showError('Nome')
            return
        }

        if (!validateField('phone', form.phone)) {
            setInvalidField('phone')
            showError('Telefone')
            return
        }

        if (!validateField('date_birth', form.date_birth)) {
            setInvalidField('date_birth')
            showError('Data de Nascimento')
            return
        }

        if (!validateField('email', form.email)) {
            setInvalidField('email')
            showError('Email')
            return
        }

        if (!validateField('gender', form.gender)) {
            setInvalidField('gender')
            showError('Gênero')
            return
        }

        if (!validateField('password', form.password)) {
            setInvalidField('password')
            showError('Senha')
            return
        }

        if (!validateField('confirmPassword', form.confirmPassword)) {
            setInvalidField('confirmPassword')
            showError('Confirme a Senha')
            return
        }

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
        <KeyboardAvoidingView behavior={behavior}>
            <ScrollViewContainerForm
                ref={current => scrollViewRef.current = current}
                keyboardShouldPersistTaps='always'>
                <View style={{ paddingBottom: 20, flex: 1 }}>
                    {(props.signup.isSigningup || props.auth.isLogingin) && <Loading size='large' color={purple} height='330' error={props.signup.error} success={props.signup.isSignup} />}

                    {(!props.signup.isSigningup && !props.auth.isLogingin) && (
                        <CardJobs backColor={white} width='80' height='140' opacity={1}>
                            <TextSignUpTitle>Cadastre-se</TextSignUpTitle>
                            {props.signup.error && <TextError>{props.signup.errorMessage}</TextError>}
                            <View>
                                <CheckBox
                                    title='Quero oferecer meus serviços no Myjobs!'
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
                                    invalidValue={invalidField === 'name'}
                                    textContentType='name'
                                    keyboardType='default'
                                    autoCompleteType='name'
                                    autoCapitalize='none'
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => phoneRef.current.focus()} />

                                <TextInputJobs
                                    ref={(input) => phoneRef.current = input}
                                    value={form.phone}
                                    name='phone'
                                    onChangeText={handleOnChange}
                                    placeholder='Telefone'
                                    textContentType='telephoneNumber'
                                    keyboardType='phone-pad'
                                    autoCompleteType='off'
                                    invalidValue={invalidField === 'phone'}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => documentRef.current.focus()} />

                                <TextInputJobs
                                    ref={(input) => documentRef.current = input}
                                    value={form.document}
                                    name='document'
                                    onChangeText={handleOnChange}
                                    keyboardType='number-pad'
                                    autoCompleteType='off'
                                    placeholder='CPF'
                                    invalidValue={invalidField === 'document'}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => dateBirthRef.current.focus()} />

                                <TextInputJobs
                                    ref={(input) => dateBirthRef.current = input}
                                    value={form.date_birth}
                                    name='date_birth'
                                    onChangeText={handleOnChange}
                                    placeholder='Data de Nascimento'
                                    autoCompleteType='off'
                                    keyboardType='number-pad'
                                    invalidValue={invalidField === 'date_birth'}
                                    returnKeyType="next"/>

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
                                    ref={(input) => emailRef.current = input}
                                    name='email'
                                    onChangeText={handleOnChange}
                                    placeholder='Email'
                                    textContentType='emailAddress'
                                    keyboardType='email-address'
                                    autoCompleteType='email'
                                    autoCapitalize='none'
                                    invalidValue={invalidField === 'email'}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => passwdRef.current.focus()} />

                                <TextInputJobs
                                    ref={(input) => passwdRef.current = input}
                                    name='password'
                                    onChangeText={handleOnChange}
                                    placeholder='Senha'
                                    textContentType='password'
                                    secureTextEntry={true}
                                    invalidValue={invalidField === 'password'}
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => confirmPasswdRef.current.focus()} />

                                <TextInputJobs
                                    ref={(input) => confirmPasswdRef.current = input}
                                    name='confirmPassword'
                                    onChangeText={handleOnChange}
                                    placeholder='Confirme a Senha'
                                    textContentType='password'
                                    secureTextEntry={true}
                                    invalidValue={invalidField === 'confirmPassword'} />

                                <ViewContainerButton>
                                    <ButtonPurple onPress={handleClickSignUp} icon="sign-in">Cadastrar</ButtonPurple>
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
        signupError: (error) => dispatch(ActionCreators.signupError(error)),
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)