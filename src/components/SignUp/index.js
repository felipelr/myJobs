import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { View, Switch } from 'react-native'
import { CheckBox } from 'react-native-elements'

import TextInputJobs from '../TextInputJobs/index'
import PickerJobs from '../PickerJobs/index'
import CardJobs from '../CardJobs/index'
import { white, purple } from '../common/util/colors'

import {
    TextSignUpTitle, ViewContainerGotoLogin, TextGotoLogin,
    ButtonGotoLogin, TextGotoLoginButton, ViewFixedContainer,
    ViewContainerRow, ButtonPurple, TextButtonPurple,
    ScrollViewContainerForm
} from './styles'
import { styleSheets } from './styles'

function SignUp(props) {
    const [userType, setUserType] = useState(1)
    const [genreList, setGenreList] = useState([
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
    const [document_number, setDocumentNumber] = useState('')
    const [dateBirth, setDateBirth] = useState('')
    const [genre, setGenre] = useState('')

    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        if (dateBirth.length > 0) {
            let replaced = dateBirth.split('/').join('')
            if (replaced.length > 4) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,2})(\d{0,4}).*/, '$1/$2/$3')
                setDateBirth(formatted)
            }
            else if (replaced.length === 4) {
                let formatted = replaced.replace(/^(\d{2})(\d{0,2}).*/, '$1/$2/')
                setDateBirth(formatted)
            }
            else if (replaced.length === 2) {
                let formatted = replaced.replace(/^(\d*)/, '$1/')
                setDateBirth(formatted)
            }
        }
    }, [dateBirth])

    const handleClickSignUp = () => {
        props.signup(email, password)
    }

    return (
        <ScrollViewContainerForm>
            <View style={{ paddingBottom: 50 }}>
                <CardJobs backColor={white} width='80' height='140' opacity={1}>
                    <TextSignUpTitle>Sign Up</TextSignUpTitle>
                    <ViewFixedContainer height='330'>
                        <View>
                            <ViewContainerRow>
                                <CheckBox title='Cliente' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType === 1} onPress={() => setUserType(1)} />
                                <CheckBox title='Profissional' checkedIcon='dot-circle-o' uncheckedIcon='circle-o' checkedColor={purple} containerStyle={styleSheets.containerCheck} checked={userType !== 1} onPress={() => setUserType(2)} />
                            </ViewContainerRow>
                            <TextInputJobs value={name} onChangeText={(text) => setName(text)} placeholder='Nome' />
                            <TextInputJobs value={phone} onChangeText={(text) => setPhone(text)} placeholder='Telefone' textContentType='telephoneNumber' keyboardType='phone-pad' />
                            <TextInputJobs value={document_number} onChangeText={(text) => setDocumentNumber(text)} placeholder='CPF' />
                            <TextInputJobs value={dateBirth} onChangeText={(text) => setDateBirth(text)} placeholder='Data de Nascimento' keyboardType='number-pad' />
                            <PickerJobs selectedValue={genre} onValueChange={(itemValue, itemIndex) => setGenre(itemValue)} itemsList={genreList} />

                            <TextInputJobs value={email} onChangeText={(text) => setEmail(text)} placeholder='Email' textContentType='emailAddress' keyboardType='email-address' />
                            <TextInputJobs value={password} onChangeText={(text) => setPassword(text)} placeholder='Senha' textContentType='password' secureTextEntry={true} />
                            <TextInputJobs value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} placeholder='Confirme a Senha' textContentType='password' secureTextEntry={true} />

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
                    </ViewFixedContainer>
                </CardJobs>
            </View>

        </ScrollViewContainerForm>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (data) => dispatch(ActionCreators.signupRequest(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)