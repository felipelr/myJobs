import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import Background from '../../components/Background/index'
import Login from '../../components/Login/index'
import SocialMidia from '../../components/SocialMidia/index'
import LoginFooter from '../../components/LoginFooter/index'

import { Container, ContainerContent, SocialMidiaText } from './styles'

export default function LoginScreen() {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

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
    }, []);

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ flex: 1 }}>
                    <Background />
                    <ContainerContent>
                        <View style={{ flex: 1 }}></View>
                        <View style={{ flex: 3 }}>
                            <Login />
                            <SocialMidiaText>Entrar com</SocialMidiaText>
                            <SocialMidia />
                        </View>
                    </ContainerContent>
                    <LoginFooter />
                </View>
            </Container>
        </KeyboardAvoidingView>
    )
}

LoginScreen.navigationOptions = {
    header: null
}