import React from 'react'
import { purple } from '../common/util/colors'
import { Button } from 'react-native-elements'
import {
    LoginTitle, LoginButtonContainer,
    ContainerNewUser, NewUserText, NewUserButton, NewUserButtonText
} from './styles'
import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import { white } from '../common/util/colors'

export default function Login(props) {
    return (
        <CardJobs backColor={white} width='300' height='330' opacity={1}>
            <LoginTitle>Login</LoginTitle>
            <TextInputJobs placeholder='Usuário' />
            <TextInputJobs placeholder='Senha' textContentType='password' secureTextEntry={true} />
            <LoginButtonContainer>
                <Button title="Entrar" buttonStyle={{ backgroundColor: purple }} />
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