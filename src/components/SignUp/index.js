import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, PermissionsAndroid, Platform } from 'react-native'
import { CheckBox } from 'react-native-elements'

import ActionCreators from '../../store/actionCreators'

import {
    TextSignUpTitle, ViewContainerGotoLogin, TextGotoLogin,
    ButtonGotoLogin, TextGotoLoginButton,
    ViewContainerRow, ButtonPurple, TextButtonPurple,
    ScrollViewContainerForm
} from './styles'
import { styleSheets } from './styles'

import TextInputJobs from '../TextInputJobs/index'
import PickerJobs from '../PickerJobs/index'
import CardJobs from '../CardJobs/index'
import TextError from '../TextError/index'
import Loading from '../Loading/index'

import { white, purple } from '../common/util/colors'

function SignUp(props) {
    const [userType, setUserType] = useState(1)
    const [invalidField, setInvalidField] = useState('')
    const [genreList, setGenreList] = useState([
        {
            label: 'Selecione',
            value: 'SELECIONE'
        },
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

    const [email, setEmail] = useState('felipe.teste@gmail.com')
    const [password, setPassword] = useState('flr123')
    const [confirmPassword, setConfirmPassword] = useState('flr123')
    const [name, setName] = useState('Felipe Lima')
    const [phone, setPhone] = useState('(18) 99764-2033')
    const [documentNumber, setDocumentNumber] = useState('425.164.238-45')
    const [dateBirth, setDateBirth] = useState('04/03/1994')
    const [genre, setGenre] = useState('MASCULINO')
    const [latitude, setLatitude] = useState('0')
    const [longitude, setLongitude] = useState('0')

    useEffect(() => {
        if (props.signup.isSignup) {
            props.ownProps.onPressLogin()
        }
    }, [props.signup.isSignup])

    useEffect(() => {
        if (props.signup.error) {
            this.scrollViewContainer.scrollTo({ x: 0, y: 0, animated: true })
        }
    }, [props.signup.error])

    useEffect(() => {
        if (dateBirth.length > 0) {
            let replaced = dateBirth.split('/').join('')
            if (replaced.length > 4) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,2})(\d{0,4}).*/, '$1/$2/$3')
                setDateBirth(formatted)
            }
            else if (replaced.length > 2) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,2}).*/, '$1/$2')
                setDateBirth(formatted)
            }
            else {
                let formatted = replaced.replace(/^(\d*)/, '$1')
                setDateBirth(formatted)
            }
        }
    }, [dateBirth])

    useEffect(() => {
        if (phone.length > 0) {
            let replaced = phone.split('(').join('')
            replaced = replaced.split(')').join('')
            replaced = replaced.split('-').join('')
            replaced = replaced.split(' ').join('')
            if (replaced.length > 10) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, '($1) $2-$3')
                setPhone(formatted)
            }
            else if (replaced.length > 6) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, '($1) $2-$3')
                setPhone(formatted)
            }
            else if (replaced.length > 2) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,4}).*/, '($1) $2')
                setPhone(formatted)
            }
            else if (replaced.length > 0) {
                let formatted = replaced.replace(/^(\d*)/, '($1')
                setPhone(formatted)
            }
        }
    }, [phone])

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
                    alert("err", err)
                }
            }
            requestLocationPermission()
        }

        return () => {
            navigator.geolocation.clearWatch(this.watchID)
        }
    })

    callLocation = () => {
        navigator.geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                const currentLongitude = JSON.stringify(position.coords.longitude)
                const currentLatitude = JSON.stringify(position.coords.latitude)
                setLongitude(currentLongitude)
                setLatitude(currentLatitude)
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        )
        this.watchID = navigator.geolocation.watchPosition((position) => {
            //Will give you the location on location change
            const currentLongitude = JSON.stringify(position.coords.longitude)
            const currentLatitude = JSON.stringify(position.coords.latitude)
            setLongitude(currentLongitude)
            setLatitude(currentLatitude)
        })
    }

    const handleClickSignUp = () => {
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
        else if (!validateField('genre', confirmPassword))
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
            case 'genre':
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
                {(props.signup.isSigningup || props.signup.isSignup) && <Loading size='large' color={purple} height='330' error={props.signup.error} success={props.signup.isSignup} />}

                {(!props.signup.isSigningup && !props.signup.isSignup) && (
                    <CardJobs backColor={white} width='80' height='140' opacity={1}>
                        <TextSignUpTitle>Sign Up</TextSignUpTitle>
                        {
                            props.signup.error && <TextError>{props.signup.errorMessage}</TextError>
                        }
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
                                selectedValue={genre}
                                onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
                                itemsList={genreList} />

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

                            <ViewContainerRow>
                                <ButtonPurple onPress={handleClickSignUp}>
                                    <TextButtonPurple>Confirmar</TextButtonPurple>
                                </ButtonPurple>
                            </ViewContainerRow>

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
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signupRequest: (user) => dispatch(ActionCreators.signupRequest(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)