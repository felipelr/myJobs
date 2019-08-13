import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { connect } from 'react-redux'

import Background from '../../components/Background/index'
import Login from '../../components/Login/index'
import SocialMidia from '../../components/SocialMidia/index'
import CopyRight from '../../components/CopyRight/index'
import SignUp from '../../components/SignUp/index'
import SocialMidiaSignup from '../../components/SocialMidiaSignup/index'
import Toast from '../../components/Toast/index'

import {
    Container, ContainerContent, SocialMidiaText,
    ViewContainerLogin, ViewContainerSignup, TextLogoTipo
} from './styles'

function LoginScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [showComponent, setShowComponent] = useState('login')
    const [showToast, setShowToast] = useState(false)
    let toastTimeout = null

    useEffect(() => {
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        this.knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        return () => {
            this.kbShow.remove()
            this.kbShow.remove()
            if (toastTimeout !== null)
                clearTimeout(toastTimeout)
        }
    }, [])

    useEffect(() => {
        if (props.signup.isSignup) {
            setShowToast(true)
            toastTimeout = setTimeout(() => {
                setShowToast(false)
            }, 3000)
        }
    }, [props.signup.isSignup])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <Background />
                    <ContainerContent>
                        <TextLogoTipo>Logo</TextLogoTipo>
                        {
                            showComponent === 'login' &&
                            <ViewContainerLogin>
                                <Login navigation={props.navigation} onPressSignup={() => setShowComponent('signup')} />
                                <SocialMidiaText>Entrar com</SocialMidiaText>
                                <SocialMidia goToSocialMidiaSignup={() => setShowComponent('socialMidiaSignup')} />
                            </ViewContainerLogin>
                        }
                        {
                            showComponent === 'signup' &&
                            <ViewContainerSignup>
                                <SignUp navigation={props.navigation} onPressLogin={() => setShowComponent('login')} />
                            </ViewContainerSignup>
                        }
                        {
                            showComponent === 'socialMidiaSignup' &&
                            <ViewContainerSignup>
                                <SocialMidiaSignup navigation={props.navigation} />
                            </ViewContainerSignup>
                        }
                    </ContainerContent>
                    <CopyRight />
                    {showToast && <Toast mensagem='Registro concluído com sucesso!' />}
                </View>
            </Container>
        </KeyboardAvoidingView>
    )
}

LoginScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        signup: state.signup,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)