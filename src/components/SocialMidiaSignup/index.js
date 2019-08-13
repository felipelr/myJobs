import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

import { white, purple } from '../common/util/colors'

import { formatPhone } from '../common/util/functions'

import {
    ViewContainer, TextSignUpTitle, ViewContainerRow,
    ButtonPurple, TextButtonPurple
} from './styles'

import { styleSheets } from './styles'

function SocialMidiaSignup(props) {
    const [userType, setUserType] = useState(1)
    const [invalidField, setInvalidField] = useState('')
    const [phone, setPhone] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')

    useEffect(() => {
        if (phone.length > 0) {
            let phone_ = formatPhone(phone)
            if (phone !== phone_)
                setPhone(phone_)
        }
    }, [phone])

    handleOnChange = (field, text) => {
        switch (field) {
            case 'phone':
                setPhone(text)
                break
            case 'documentNumber':
                setDocumentNumber(text)
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

        let date = dateBirth.split("/")
        let dateFormatted = date[2] + "-" + date[1] + "-" + date[0]

        let user = {
            userType: userType,
            name: name,
            phone: phone,
            document: documentNumber,
            date_birth: dateFormatted,
            genre: genre,
            email: email,
            password: password,
            longitude: longitude,
            latitude: latitude
        }

        //props.signupRequest(user)
    }

    return (
        <ViewContainer>
            <CardJobs backColor={white} width='80' height='140' opacity={1}>
                <TextSignUpTitle>Sign Up</TextSignUpTitle>
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

                    <ViewContainerRow>
                        <ButtonPurple onPress={handleClickSignUp}>
                            <TextButtonPurple>Confirmar</TextButtonPurple>
                        </ButtonPurple>
                    </ViewContainerRow>
                </View>
            </CardJobs>
        </ViewContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        socialMidiaSignup: state.socialMidiaSignup,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        socialMidiaSignupInit: (user) => dispatch(ActionCreators.socialMidiaSignupInit(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMidiaSignup)