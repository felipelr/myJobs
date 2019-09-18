import React, { useState, useEffect } from 'react'
import { View, PermissionsAndroid, Platform } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import Geolocation from 'react-native-geolocation-service'

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
    TextSignUpTitle, ViewContainerGotoLogin, TextGotoLogin,
    ButtonGotoLogin, TextGotoLoginButton,
    ViewContainerRow, ViewContainerButton, ScrollViewContainerForm
} from './styles'

import { styleSheets } from './styles'

function SignUp(props) {
    const [userType, setUserType] = useState(1)
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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [documentNumber, setDocumentNumber] = useState('')
    const [dateBirth, setDateBirth] = useState('')
    const [gender, setGender] = useState('MASCULINO')
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
                        'title': 'Acesso a Localização requisitado',
                        'message': 'Este aplicativo precisa acessar sua localização'
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

        return () => {
            if (this.watchID)
                Geolocation.clearWatch(this.watchID)
        }
    }, [])

    useEffect(() => {
        if (props.signup.isSignup) {
            props.login(props.signup.user.email, props.signup.user.password)
        }
    }, [props.signup.isSignup])

    useEffect(() => {
        if (props.signup.error) {
            this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
        }
    }, [props.signup.error])

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
        if (dateBirth.length > 0) {
            let date_ = formatDate(dateBirth)
            if (dateBirth !== date_)
                setDateBirth(date_)
        }
    }, [dateBirth])

    useEffect(() => {
        if (phone.length > 0) {
            let phone_ = formatPhone(phone)
            if (phone !== phone_)
                setPhone(phone_)
        }
    }, [phone])

    callLocation = () => {
        Geolocation.getCurrentPosition(
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
        this.watchID = Geolocation.watchPosition(
            //Will give you the location on location change
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude)
                const currentLatitude = JSON.stringify(position.coords.latitude)
                setLongitude(currentLongitude)
                setLatitude(currentLatitude)
            })
    }

    handleClickSignUp = () => {
        if (!validateField('name', name))
            return
        else if (!validateField('phone', phone))
            return
        else if (!validateField('documentNumber', documentNumber))
            return
        else if (!validateField('dateBirth', dateBirth))
            return
        else if (!validateField('email', email))
            return
        else if (!validateField('password', password))
            return
        else if (!validateField('confirmPassword', confirmPassword))
            return
        else if (!validateField('gender', confirmPassword))
            return

        let date = dateBirth.split("/")
        let dateFormatted = date[2] + "-" + date[1] + "-" + date[0]

        let user = {
            userType: userType,
            name: name,
            phone: phone,
            document: documentNumber,
            date_birth: dateFormatted,
            gender: gender,
            email: email,
            password: password,
            longitude: longitude,
            latitude: latitude
        }
        props.signupRequest(user)
    }

    handleOnChange = (field, text) => {
        switch (field) {
            case 'name':
                setName(text)
                break
            case 'phone':
                setPhone(text)
                break
            case 'documentNumber':
                setDocumentNumber(text)
                break
            case 'dateBirth':
                setDateBirth(text)
                break
            case 'email':
                setEmail(text)
                break
            case 'password':
                setPassword(text)
                break
            case 'confirmPassword':
                setConfirmPassword(text)
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
            case 'name':
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
            case 'password':
                if (value.length < 5)
                    return false
                break
            case 'confirmPassword':
                if (value !== password)
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

    return (
        <ScrollViewContainerForm ref={(c) => this.scrollViewContainer = c}>
            <View style={{ paddingBottom: 50 }}>
                {(props.signup.isSigningup || props.auth.isLogingin) && <Loading size='large' color={purple} height='330' error={props.signup.error} success={props.signup.isSignup} />}

                {(!props.signup.isSigningup && !props.auth.isLogingin) && (
                    <CardJobs backColor={white} width='80' height='140' opacity={1}>
                        <TextSignUpTitle>Sign Up</TextSignUpTitle>
                        {props.signup.error && <TextError>{props.signup.errorMessage}</TextError>}
                        <View>
                            <ViewContainerRow>
                                <CheckBox title='Cliente' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType === 1} onPress={() => setUserType(1)} />
                                <CheckBox title='Profissional' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType !== 1} onPress={() => setUserType(2)} />
                            </ViewContainerRow>
                            <TextInputJobs
                                value={name}
                                onChangeText={(text) => handleOnChange('name', text)}
                                placeholder='Nome'
                                invalidValue={invalidField}
                                nameField='name' />

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

                            <TextInputJobs
                                value={email}
                                onChangeText={(text) => handleOnChange('email', text)}
                                placeholder='Email'
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                invalidValue={invalidField}
                                nameField='email' />

                            <TextInputJobs
                                value={password}
                                onChangeText={(text) => handleOnChange('password', text)}
                                placeholder='Senha'
                                textContentType='password'
                                secureTextEntry={true}
                                invalidValue={invalidField}
                                nameField='password' />

                            <TextInputJobs
                                value={confirmPassword}
                                onChangeText={(text) => handleOnChange('confirmPassword', text)}
                                placeholder='Confirme a Senha'
                                textContentType='password'
                                secureTextEntry={true}
                                invalidValue={invalidField}
                                nameField='confirmPassword' />

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
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        signup: state.signup,
        auth: state.auth,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupRequest: (user) => dispatch(ActionCreators.signupRequest(user)),
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)