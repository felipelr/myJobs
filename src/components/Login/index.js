import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'
import ActionCreators from '../../store/actionCreators'

import { purple } from '../common/util/colors'
import { Button } from 'react-native-elements'
import {
    LoginTitle, LoginButtonContainer,
    ContainerNewUser, NewUserText, NewUserButton, NewUserButtonText
} from './styles'
import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import { white } from '../common/util/colors'

import store from '../../store/index';

function Login(props) {
    const [email, setEmail] = useState('root@email.tld')
    const [password, setPassword] = useState('rootroot')

    const state = store.getState()

    const handleClickLogin = () => {
        props.login(email, password)

        /*
        if (props.auth.user) {
            Alert.alert(
                'Alert Title',
                'user: ' + JSON.stringify(props.auth.user),
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            )
        }
        else {
            Alert.alert(
                'Alert Title',
                '',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            )
        } */
    }

    return (
        <CardJobs backColor={white} width='300' height='330' opacity={1}>
            <LoginTitle>Login {JSON.stringify(state.reducers.auth.isAuth)}</LoginTitle>
            <TextInputJobs value={email} onChangeText={(text) => setEmail(text)} placeholder='Usuário' />
            <TextInputJobs value={password} onChangeText={(text) => setPassword(text)} placeholder='Senha' textContentType='password' secureTextEntry={true} />
            <LoginButtonContainer>
                <Button title="Entrar" buttonStyle={{ backgroundColor: purple }} onPress={handleClickLogin} />
            </LoginButtonContainer>
            <ContainerNewUser>
                <NewUserText>Novo por aqui?</NewUserText>
                <NewUserButton>
                    <NewUserButtonText>Faça seu cadastro</NewUserButtonText>
                </NewUserButton>
            </ContainerNewUser>
        </CardJobs>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)