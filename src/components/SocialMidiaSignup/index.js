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
    const [userType, setUserType] = useState(1)
    const [invalidField, setInvalidField] = useState('')
    const [phone, setPhone] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [dateBirth, setDateBirth] = useState('')
    const [gender, setGender] = useState('MASCULINO')
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
            this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
        }
    }, [props.socialMidiaSignup.error])

    useEffect(() => {
        if (props.auth.isAuth) {
            props.ownProps.navigation.navigate('ProfessionalSearch')
            props.ownProps.onPressLogin()
        }
        else if (props.auth.error) {
            props.ownProps.onPressLogin()
        }
    }, [props.auth.isAuth, props.auth.error])

    useEffect(() => {
        if (phone.length > 0) {
            let phone_ = formatPhone(phone)
            if (phone !== phone_)
                setPhone(phone_)
        }
    }, [phone])

    useEffect(() => {
        if (dateBirth.length > 0) {
            let date_ = formatDate(dateBirth)
            if (dateBirth !== date_)
                setDateBirth(date_)
        }
    }, [dateBirth])

    handleOnChange = (field, text) => {
        switch (field) {
            case 'phone':
                setPhone(text)
                break
            case 'documentNumber':
                setDocumentNumber(text)
                break
            case 'dateBirth':
                setDateBirth(text)
                break
            default:
                break
        }

        if (!validateField(field, text))
            setInvalidField(field)
        else
            setInvalidField('')
    }

    validateField = (field, value) => {
        switch (field) {
            case 'documentNumber':
                if (value.length === 0)
                    return false
                break
            case 'phone':
                if (value.length < 14)
                    return false
                break
            case 'dateBirth':
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
        if (!validateField('phone', phone))
            return
        else if (!validateField('documentNumber', documentNumber))
            return
        else if (!validateField('dateBirth', dateBirth))
            return
        else if (!validateField('gender', gender))
            return

        let date = dateBirth.split("/")
        let dateFormatted = date[2] + "-" + date[1] + "-" + date[0]

        if (props.socialMidiaSignup.user.facebook_id) {
            let user = {
                userType: userType,
                phone: phone,
                document: documentNumber,
                name: props.socialMidiaSignup.user.name,
                date_birth: dateFormatted,
                gender: gender,
                email: props.socialMidiaSignup.user.email,
                password: props.socialMidiaSignup.user.facebook_id,
                facebook_id: props.socialMidiaSignup.user.facebook_id
            }

            props.socialMidiaSignupRequest(user)
        }
        else if (props.socialMidiaSignup.user.google_id) {
            let user = {
                userType: userType,
                phone: phone,
                document: documentNumber,
                name: props.socialMidiaSignup.user.name,
                date_birth: dateFormatted,
                gender: props.socialMidiaSignup.user.gender,
                email: props.socialMidiaSignup.user.email,
                password: props.socialMidiaSignup.user.google_id,
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
                                <CheckBox title='Cliente' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType === 1} onPress={() => setUserType(1)} />
                                <CheckBox title='Profissional' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType !== 1} onPress={() => setUserType(2)} />
                            </ViewContainerRow>

                            <TextInputJobs
                                value={phone}
                                onChangeText={(text) => handleOnChange('phone', text)}
                                placeholder='Telefone'
                                textContentType='telephoneNumber'
                                keyboardType='phone-pad'
                                invalidValue={invalidField}
                                nameField='phone' />

                            <TextInputJobs
                                value={documentNumber}
                                onChangeText={(text) => handleOnChange('documentNumber', text)}
                                placeholder='CPF'
                                invalidValue={invalidField}
                                nameField='documentNumber' />

                            <TextInputJobs
                                value={dateBirth}
                                onChangeText={(text) => handleOnChange('dateBirth', text)}
                                placeholder='Data de Nascimento'
                                keyboardType='number-pad'
                                invalidValue={invalidField}
                                nameField='dateBirth' />

                            <PickerJobs
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
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
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMidiaSignup)