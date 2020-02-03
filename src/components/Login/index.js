import React, { useState, useEffect } from 'react'
import { CheckBox } from 'react-native-elements'
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
    ViewContainerRow
} from './styles'

import { styleSheets } from './styles'

import TextInputJobs from '../TextInputJobs/index'
import CardJobs from '../CardJobs/index'
import Loading from '../Loading/index'
import TextError from '../TextError/index'
import ButtonPurple from '../ButtonPurple/index'

function Login(props) {
    const [form, setForm] = useState({
        email: 'felipe.lima.flr@gmail.com',
        password: '101762866218022699799',
        userType: props.auth.userType === 'client' ? 1 : 2
    })

    useEffect(() => {
        if (props.auth.isAuth) {
            if (form.userType === 1)
                props.ownProps.navigation.navigate('CategoriesSearch')
            else
                props.ownProps.navigation.navigate('ProfessionalHome')
        }
    }, [props.auth.isAuth])

    useEffect(() => {
        if (form.userType === 1)
            props.authSetUserType('client')
        else
            props.authSetUserType('professional')

    }, [form.userType])

    const handleClickLogin = () => {
        props.login(form.email, form.password, form.userType)
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
                        <ViewContainerRow>
                            <CheckBox
                                title='Cliente'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={purple}
                                containerStyle={styleSheets.containerCheck}
                                checked={form.userType === 1}
                                onPress={() => {
                                    setForm({
                                        ...form,
                                        'userType': 1
                                    })
                                }} />
                            <CheckBox
                                title='Profissional'
                                checkedIcon='dot-circle-o'
                                uncheckedIcon='circle-o'
                                checkedColor={purple}
                                containerStyle={styleSheets.containerCheck}
                                checked={form.userType !== 1}
                                onPress={() => {
                                    setForm({
                                        ...form,
                                        'userType': 2
                                    })
                                }} />
                        </ViewContainerRow>
                        <TextInputJobs
                            value={form.email}
                            name='email'
                            onChangeText={handleOnChange}
                            placeholder='Usuário' />
                        <TextInputJobs
                            value={form.password}
                            name='password'
                            onChangeText={handleOnChange}
                            placeholder='Senha'
                            textContentType='password'
                            secureTextEntry={true} />

                        <LoginButtonContainer>
                            <ButtonPurple onPress={handleClickLogin}>Entrar</ButtonPurple>
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
        login: (email, password, userType) => dispatch(ActionCreators.loginRequest(email, password, userType)),
        authSetUserType: (userType) => dispatch(ActionCreators.authSetUserType(userType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)