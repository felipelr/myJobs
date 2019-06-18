import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'

import Background from '../../components/Background/index'
import Login from '../../components/Login/index'
import SocialMidia from '../../components/SocialMidia/index'
import CopyRight from '../../components/CopyRight/index'
import SignUp from '../../components/SignUp/index'

import {
    Container, ContainerContent, SocialMidiaText,
    ViewContainerLogin, ViewContainerSignup
} from './styles'

export default function LoginScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [showLogin, setShowLogin] = useState(true)

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
        }
    }, [])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <Background />
                    <ContainerContent>
                        {
                            showLogin &&
                            <ViewContainerLogin>
                                <Login navigation={props.navigation} onPressSignup={() => setShowLogin(false)} />
                                <SocialMidiaText>Entrar com</SocialMidiaText>
                                <SocialMidia />
                            </ViewContainerLogin>
                        }
                        {
                            !showLogin &&
                            <ViewContainerSignup>
                                <SignUp navigation={props.navigation} onPressLogin={() => setShowLogin(true)} />
                            </ViewContainerSignup>
                        }
                    </ContainerContent>
                    <CopyRight />
                </View>
            </Container>
        </KeyboardAvoidingView>
    )
}

LoginScreen.navigationOptions = {
    header: null
}