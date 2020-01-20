import React, { useState, useEffect } from 'react'
import { View, PermissionsAndroid, Platform } from 'react-native'
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
    ViewContainer, TextSignUpTitle, ViewContainerRow, ScrollViewContainerForm, ViewContainerButton
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
        userType: props.socialMidiaSignup.user.client == null ? 2 : 1,
        phone: '',
        document: '',
        date_birth: '',
        gender: 'MASCULINO'
    })

    useEffect(() => {
        //verificar se já existe cadastro do facebook
        if (props.socialMidiaSignup.user.facebook_id) {
            props.socialMidiaVerifyAccount(props.socialMidiaSignup.user.facebook_id, 'facebook')
        }
        else if (props.socialMidiaSignup.user.google_id) {
            props.socialMidiaVerifyAccount(props.socialMidiaSignup.user.google_id, 'google')
        }
    }, [])

    useEffect(() => {
        if (props.socialMidiaSignup.accVerified === 1) {
            props.login(props.socialMidiaSignup.user.email, props.socialMidiaSignup.user.password, form.userType)
        }
    }, [props.socialMidiaSignup.accVerified])

    useEffect(() => {
        if (props.socialMidiaSignup.isSignup) {
            props.login(props.socialMidiaSignup.newUser.email, props.socialMidiaSignup.newUser.password, form.userType)
        }
    }, [props.socialMidiaSignup.isSignup])

    useEffect(() => {
        if (props.socialMidiaSignup.error) {
            this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
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

        if (props.socialMidiaSignup.user.facebook_id) {
            let user = {
                ...form,
                name: props.socialMidiaSignup.user.name,
                email: props.socialMidiaSignup.user.email,
                password: props.socialMidiaSignup.user.facebook_id,
                date_birth: dateFormatted,
                facebook_id: props.socialMidiaSignup.user.facebook_id
            }

            props.socialMidiaSignupRequest(user)
        }
        else if (props.socialMidiaSignup.user.google_id) {
            let user = {
                ...form,
                name: props.socialMidiaSignup.user.name,
                email: props.socialMidiaSignup.user.email,
                password: props.socialMidiaSignup.user.google_id,
                date_birth: dateFormatted,
                gender: props.socialMidiaSignup.user.gender,
                google_id: props.socialMidiaSignup.user.google_id
            }

            props.socialMidiaSignupRequest(user)
        }
    }

    return (
        <ScrollViewContainerForm ref={(c) => this.scrollViewContainer = c}>
            <ViewContainer>
                {(props.socialMidiaSignup.isSigningup || props.socialMidiaSignup.verifyingAcc || props.auth.isLogingin) && <Loading size='large' color={purple} height='330' error={props.socialMidiaSignup.error} success={props.socialMidiaSignup.isSignup} />}

                {(!props.socialMidiaSignup.isSigningup && !props.socialMidiaSignup.verifyingAcc && !props.auth.isLogingin) && (
                    <CardJobs backColor={white} width='80' height='140' opacity={1}>
                        <TextSignUpTitle>Complete seu Cadastro</TextSignUpTitle>
                        {
                            props.socialMidiaSignup.error && <TextError>{props.socialMidiaSignup.errorMessage}</TextError>
                        }
                        <View>
                            <ViewContainerRow>
                                <CheckBox
                                    title='Cliente'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor={purple}
                                    containerStyle={styleSheets.containerCheck}
                                    checked={form.userType === 1}
                                    onPress={() => {
                                        setForm({
                                            ...form,
                                            'userType': 1
                                        })
                                    }} />
                                <CheckBox
                                    title='Profissional'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checkedColor={purple}
                                    containerStyle={styleSheets.containerCheck}
                                    checked={form.userType !== 1}
                                    onPress={() => {
                                        setForm({
                                            ...form,
                                            'userType': 2
                                        })
                                    }} />
                            </ViewContainerRow>

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
        socialMidiaVerifyAccount: (socialMidiaId, socialMidiaType) => dispatch(ActionCreators.socialMidiaVerifyAccount(socialMidiaId, socialMidiaType)),
        login: (email, password, userType) => dispatch(ActionCreators.loginRequest(email, password, userType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMidiaSignup)