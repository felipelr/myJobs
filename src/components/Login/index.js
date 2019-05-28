import React from 'react'
import PrimaryButton from '../PrimaryButton/index'
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
                <PrimaryButton text='Entrar' />
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