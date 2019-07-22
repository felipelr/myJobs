import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

import { white, purple } from '../common/util/colors'

import {
    LoginTitle, LoginButtonContainer,
    ContainerNewUser, NewUserText, NewUserButton, NewUserButtonText,
    ButtonPurple, TextButtonPurple, ViewContainerFields
} from './styles'
import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import Loading from '../Loading/index'
import TextError from '../TextError/index'

function Login(props) {
    const [email, setEmail] = useState('root@email.tld')
    const [password, setPassword] = useState('rootroot')

    useEffect(() => {
        if (props.auth.isAuth) {
            props.ownProps.navigation.navigate('ProfessionalSearch')
        }
    }, [props.auth.isAuth])

    const handleClickLogin = () => {
        props.login(email, password)
    }

    return (
        <React.Fragment>
            {props.auth.isLogingin && <Loading size='large' color={purple} height='330' />}
            {!props.auth.isLogingin && (
                <CardJobs backColor={white} width='80' height='55' opacity={1}>
                    <LoginTitle>Login</LoginTitle>
                    {
                        props.auth.error && <TextError>{props.auth.errorMessage}</TextError>
                    }
                    <ViewContainerFields>
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
                    </ViewContainerFields>

                </CardJobs>
            )}

        </React.Fragment>
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