import React from 'react'
import { purple } from '../common/util/colors'
import { Button } from 'react-native-elements'
import {
    Card, LoginTitle, ContainerTextInput, LoginTextInput, LoginButtonContainer,
    ContainerNewUser, NewUserText, NewUserButton, NewUserButtonText
} from './styles'

export default function Login(props) {
    return (
        <Card backColor='#FFFFFF' width='300' height='330'>
            <LoginTitle>Login</LoginTitle>
            <ContainerTextInput>
                <LoginTextInput placeholder='Usuário'></LoginTextInput>
            </ContainerTextInput>
            <ContainerTextInput>
                <LoginTextInput placeholder='Senha' textContentType='password' secureTextEntry={true}></LoginTextInput>
            </ContainerTextInput>
            <LoginButtonContainer>
                <Button title="Entrar" buttonStyle={{ backgroundColor: purple }} />
            </LoginButtonContainer>
            <ContainerNewUser>
                <NewUserText>Novo por aqui?</NewUserText>
                <NewUserButton>
                    <NewUserButtonText>Faça seu cadastro</NewUserButtonText>
                </NewUserButton>
            </ContainerNewUser>
        </Card>
    )
}