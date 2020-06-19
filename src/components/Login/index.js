import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'
import { white, purple } from '../common/util/colors'

import {
    LoginTitle,
    LoginButtonContainer,
    ContainerNewUser,
    NewUserText,
    NewUserButton,
    NewUserButtonText,
    ViewContainerFields,
} from './styles'

import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import Loading from '../Loading/index'
import TextError from '../TextError/index'
import ButtonPurple from '../ButtonPurple/index'

const Login = (props) => {
    const [form, setForm] = useState({
        email: 'felipe.lima.flr@gmail.com', //felipe.lima.flr@gmail.com
        password: '101762866218022699799', //101762866218022699799
    })
    /* const [form, setForm] = useState({
        email: '',
        password: '',
    }) */
    
    const passwdRef = useRef()

    useEffect(() => {
        if (props.auth.isAuth) {
            if (props.auth.userType === 'client')
                props.ownProps.navigation.navigate('CategoriesSearch')
            else
                props.ownProps.navigation.navigate('ProfessionalHome')
        }
    }, [props.auth.isAuth])

    const handleClickLogin = () => {
        props.login(form.email, form.password)
    }

    handleOnChange = (name, text) => {
        setForm({
            ...form,
            [name]: text
        })
    }

    return (
        <React.Fragment>
            {(props.auth.isLogingin || props.auth.isAuth) && <Loading size='large' color={purple} height='330' error={props.auth.error} success={props.auth.isAuth} />}

            {(!props.auth.isLogingin && !props.auth.isAuth) && (
                <CardJobs backColor={white} width='80' height='55' opacity={1}>
                    <LoginTitle>Login</LoginTitle>
                    {
                        props.auth.error && <TextError>{props.auth.errorMessage}</TextError>
                    }
                    <ViewContainerFields>
                        <TextInputJobs
                            value={form.email}
                            name='email'
                            onChangeText={handleOnChange}
                            placeholder='Usuário'
                            autoCompleteType='email'
                            autoCapitalize='none'
                            returnKeyType="next"
                            blurOnSubmit={false}
                            onSubmitEditing={() => passwdRef.current.focus()} />

                        <TextInputJobs
                            ref={input => { passwdRef.current = input; }}
                            value={form.password}
                            name='password'
                            onChangeText={handleOnChange}
                            placeholder='Senha'
                            textContentType='password'
                            secureTextEntry={true} />

                        <LoginButtonContainer>
                            <ButtonPurple onPress={handleClickLogin} icon="sign-in">Entrar</ButtonPurple>
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
        login: (email, password) => dispatch(ActionCreators.loginRequest(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)