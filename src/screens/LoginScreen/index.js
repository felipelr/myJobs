import React from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, Text } from 'react-native'
import Background from '../../components/Background/index'
import Card from '../../components/Card/index'
import Login from '../../components/Login/index'
import SocialMidia from '../../components/SocialMidia/index'
import LoginFooter from '../../components/LoginFooter/index'

import { Container, ContainerContent, SocialMidiaText } from './styles'

export default class LoginScreen extends React.Component {
    state = {
        keyboardIsVisible: false
    }
    componentDidMount() {
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            this.setState({ keyboardIsVisible: true })
        })
        this.knHide = Keyboard.addListener('keyboardDidHide', () => {
            this.setState({ keyboardIsVisible: false })
        })
    }
    componentWillUnmount() {
        this.kbShow.remove()
        this.kbShow.remove()
    }
    render() {
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
}

LoginScreen.navigationOptions = {
    header: null
}
