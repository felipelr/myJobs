import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import { white } from '../common/util/colors'

import {
    LoginTitle, LoginButtonContainer,
    ContainerNewUser, NewUserText, NewUserButton, NewUserButtonText,
    ButtonPurple, TextButtonPurple
} from './styles'
import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'

function Login(props) {
    const [email, setEmail] = useState('root@email.tld')
    const [password, setPassword] = useState('rootroot')

    useEffect(() => {
        if (props.auth.error) {
            Alert.alert(
                'Atenção',
                props.auth.errorMessage,
                [
                    { text: 'OK', onPress: () => console.log(props.auth.errorMessage) },
                ],
                { cancelable: false },
            )
        }
    }, [props.auth.error]);

    useEffect(() => {
        if (props.auth.isAuth) {
            props.ownProps.navigation.navigate('ProfessionalSearch')
        }
    }, [props.auth.isAuth])

    const handleClickLogin = () => {
        props.login(email, password)
    }

    return (
        <CardJobs backColor={white} width='300' height='330' opacity={1}>
            <LoginTitle>Login</LoginTitle>
            <TextInputJobs value={email} onChangeText={(text) => setEmail(text)} placeholder='Usuário' />
            <TextInputJobs value={password} onChangeText={(text) => setPassword(text)} placeholder='Senha' textContentType='password' secureTextEntry={true} />
            <LoginButtonContainer>
                <ButtonPurple onPress={handleClickLogin}>
                    <TextButtonPurple>Entrar</TextButtonPurple>
                </ButtonPurple>
            </LoginButtonContainer>
            <ContainerNewUser>
                <NewUserText>Novo por aqui?</NewUserText>
                <NewUserButton onPress={props.ownProps.onPressSignup}>
                    <NewUserButtonText>Faça seu cadastro</NewUserButtonText>
                </NewUserButton>
            </ContainerNewUser>
        </CardJobs>
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
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)