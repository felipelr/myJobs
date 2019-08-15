import React, { useState, useEffect } from 'react'
import { View, PermissionsAndroid, Platform } from 'react-native'
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
    ButtonPurple, TextButtonPurple, ScrollViewContainerForm
} from './styles'

import { styleSheets } from './styles'

function SocialMidiaSignup(props) {
    const [userType, setUserType] = useState(1)
    const [invalidField, setInvalidField] = useState('')
    const [phone, setPhone] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [latitude, setLatitude] = useState('0')
    const [longitude, setLongitude] = useState('0')

    useEffect(() => {
        if (Platform.OS === 'ios') {
            callLocation()
        } else {
            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        callLocation()
                    } else {
                        alert("Permission Denied")
                    }
                } catch (err) {
                    alert(err)
                }
            }
            requestLocationPermission()
        }

        console.log('social_midia_signup')

        //verificar se já existe cadastro do facebook
        if (props.socialMidiaSignup.user.facebook_id) {
            props.socialMidiaVerifyAccount(props.socialMidiaSignup.user.facebook_id, 'facebook')
        }

        return () => {
            navigator.geolocation.clearWatch(this.watchID)
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
            props.ownProps.onPressLogin()
            props.ownProps.navigation.navigate('ProfessionalSearch')
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

    callLocation = () => {
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude)
                const currentLatitude = JSON.stringify(position.coords.latitude)
                setLongitude(currentLongitude)
                setLatitude(currentLatitude)
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            const currentLongitude = JSON.stringify(position.coords.longitude)
            const currentLatitude = JSON.stringify(position.coords.latitude)
            setLongitude(currentLongitude)
            setLatitude(currentLatitude)
        })
    }

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

        let date = props.socialMidiaSignup.user.birthday.split("/")
        let dateFormatted = date[2] + "-" + date[1] + "-" + date[0]

        let user = {
            userType: userType,
            phone: phone,
            document: documentNumber,
            name: props.socialMidiaSignup.user.name,
            date_birth: dateFormatted,
            gender: props.socialMidiaSignup.user.gender,
            email: props.socialMidiaSignup.user.email,
            password: props.socialMidiaSignup.user.facebook_id,
            longitude: longitude,
            latitude: latitude,
            facebook_id: props.socialMidiaSignup.user.facebook_id
        }

        console.log(user)

        props.socialMidiaSignupRequest(user)
    }

    return (
        <ScrollViewContainerForm ref={(c) => this.scrollViewContainer = c}>
            <ViewContainer>
                {(props.socialMidiaSignup.isSigningup || props.socialMidiaSignup.verifyingAcc || props.auth.isLogingin) && <Loading size='large' color={purple} height='330' error={props.socialMidiaSignup.error} success={props.socialMidiaSignup.isSignup} />}

                {(!props.socialMidiaSignup.isSigningup && !props.socialMidiaSignup.verifyingAcc && !props.auth.isLogingin) && (
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