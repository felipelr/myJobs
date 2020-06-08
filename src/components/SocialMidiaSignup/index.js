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
    ViewContainer,
    TextSignUpTitle,
    TextSignUpSubtitle,
    ScrollViewContainerForm,
    ViewContainerButton
} from './styles'

import { styleSheets } from './styles'

function SocialMidiaSignup(props) {
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
        userType: props.auth.userType === 'professional' ? 2 : 1,
        phone: '',
        document: '',
        date_birth: '',
        gender: 'MASCULINO'
    })

    const scrollViewRef = useRef()

    useEffect(() => {
        //verificar se já existe cadastro do facebook
        if (props.socialMidiaSignup.user.facebook_token) {
            props.socialMidiaVerifyAccount(props.socialMidiaSignup.user.facebook_token, 'facebook')
        }
        else if (props.socialMidiaSignup.user.google_token) {
            props.socialMidiaVerifyAccount(props.socialMidiaSignup.user.google_token, 'google')
        }
    }, [])

    useEffect(() => {
        if (props.socialMidiaSignup.accVerified === 1) {
            props.login(props.socialMidiaSignup.user.email, props.socialMidiaSignup.user.password)
        }
    }, [props.socialMidiaSignup.accVerified])

    useEffect(() => {
        if (props.socialMidiaSignup.isSignup) {
            props.login(props.socialMidiaSignup.newUser.email, props.socialMidiaSignup.newUser.password)
        }
    }, [props.socialMidiaSignup.isSignup])

    useEffect(() => {
        if (props.socialMidiaSignup.error) {
            scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true })
        }
    }, [props.socialMidiaSignup.error])

    useEffect(() => {
        if (props.auth.isAuth) {
            if (props.socialMidiaSignup.user.userType == 2) {
                props.ownProps.navigation.navigate('ProfessionalHome')
            }
            else {
                props.ownProps.navigation.navigate('CategoriesSearch')
            }

            props.ownProps.onPressLogin()
        }
        else if (props.auth.error) {
            if (props.auth.errorMessage !== 'new_as_client' && props.auth.errorMessage !== 'new_as_professional') {
                props.ownProps.onPressLogin()
            }
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

        if (!validateField(name, text))
            setInvalidField(name)
        else
            setInvalidField('')
    }

    const validateField = (field, value) => {
        switch (field) {
            case 'phone':
                if (value.length < 14)
                    return false
                break
            case 'date_birth':
                if (value.length < 10)
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
        scrollViewRef.current.scrollTo({ x: 0, y: 1, animated: true })
        props.socialMidiaSignupError('O campo ' + description + ' está inválido.')
    }

    const existUserName = () => {
        return props.socialMidiaSignup.user && props.socialMidiaSignup.user.name
    }

    const existClientName = () => {
        return props.socialMidiaSignup.user && props.socialMidiaSignup.user.client && props.socialMidiaSignup.user.client.name
    }

    const existProfessionalName = () => {
        return props.socialMidiaSignup.user && props.socialMidiaSignup.user.professional && props.socialMidiaSignup.user.professional.name
    }

    const handleClickSignUp = () => {
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

        if (!validateField('gender', form.gender)) {
            setInvalidField('gender')
            showError('Gênero')
            return
        }

        let date = form.date_birth.split("/")
        let dateFormatted = date[2] + "-" + date[1] + "-" + date[0]

        const name = existUserName() ? props.socialMidiaSignup.user.name : existClientName() ? props.socialMidiaSignup.user.client.name : existProfessionalName() ? props.socialMidiaSignup.user.professional.name : ''

        if (props.socialMidiaSignup.user.facebook_token) {
            let user = {
                ...form,
                name: name,
                email: props.socialMidiaSignup.user.email,
                password: props.socialMidiaSignup.user.facebook_token,
                photo: '',
                date_birth: dateFormatted,
                facebook_token: props.socialMidiaSignup.user.facebook_token
            }

            props.socialMidiaSignupRequest(user)
        }
        else if (props.socialMidiaSignup.user.google_token) {
            let user = {
                ...form,
                name: name,
                email: props.socialMidiaSignup.user.email,
                password: props.socialMidiaSignup.user.google_token,
                photo: '',
                date_birth: dateFormatted,
                gender: props.socialMidiaSignup.user.gender,
                google_token: props.socialMidiaSignup.user.google_token
            }

            props.socialMidiaSignupRequest(user)
        }
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <ScrollViewContainerForm ref={(c) => scrollViewRef.current = c} keyboardShouldPersistTaps='always'>
                <ViewContainer>
                    {(props.socialMidiaSignup.isSigningup || props.socialMidiaSignup.verifyingAcc || props.auth.isLogingin) && <Loading size='large' color={purple} height='330' error={props.socialMidiaSignup.error} success={props.socialMidiaSignup.isSignup} />}

                    {(!props.socialMidiaSignup.isSigningup && !props.socialMidiaSignup.verifyingAcc && !props.auth.isLogingin) && (
                        <CardJobs backColor={white} width='80' height='140' opacity={1}>
                            <TextSignUpTitle>Olá {existUserName() ? props.socialMidiaSignup.user.name : existClientName() ? props.socialMidiaSignup.user.client.name : existProfessionalName() ? props.socialMidiaSignup.user.professional.name : ''},</TextSignUpTitle>
                            <TextSignUpSubtitle>Precisamos de mais algumas informações para concluir o seu cadastro.</TextSignUpSubtitle>
                            {
                                props.socialMidiaSignup.error && <TextError>{props.socialMidiaSignup.errorMessage}</TextError>
                            }
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
                                    value={form.phone}
                                    name='phone'
                                    onChangeText={handleOnChange}
                                    placeholder='Telefone'
                                    textContentType='telephoneNumber'
                                    keyboardType='phone-pad'
                                    invalidValue={invalidField === 'phone'} />

                                <TextInputJobs
                                    value={form.document}
                                    name='document'
                                    onChangeText={handleOnChange}
                                    placeholder='CPF'
                                    keyboardType='number-pad'
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

                                <ViewContainerButton>
                                    <ButtonPurple onPress={handleClickSignUp}>Continuar</ButtonPurple>
                                </ViewContainerButton>
                            </View>
                        </CardJobs>
                    )}
                </ViewContainer>
            </ScrollViewContainerForm>
        </KeyboardAvoidingView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        socialMidiaSignup: state.socialMidiaSignup,
        auth: state.auth,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        socialMidiaSignupInit: (user) => dispatch(ActionCreators.socialMidiaSignupInit(user)),
        socialMidiaSignupRequest: (user) => dispatch(ActionCreators.socialMidiaSignupRequest(user)),
        socialMidiaSignupError: (error) => dispatch(ActionCreators.socialMidiaSignupError(error)),
        socialMidiaVerifyAccount: (socialMidiaId, socialMidiaType) => dispatch(ActionCreators.socialMidiaVerifyAccount(socialMidiaId, socialMidiaType)),
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMidiaSignup)