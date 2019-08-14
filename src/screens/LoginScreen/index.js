import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, BackHandler } from 'react-native'

import Background from '../../components/Background/index'
import Login from '../../components/Login/index'
import SocialMidia from '../../components/SocialMidia/index'
import CopyRight from '../../components/CopyRight/index'
import SignUp from '../../components/SignUp/index'
import SocialMidiaSignup from '../../components/SocialMidiaSignup/index'

import {
    Container, ContainerContent, SocialMidiaText,
    ViewContainerLogin, ViewContainerSignup, TextLogoTipo
} from './styles'

export default function LoginScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [showComponent, setShowComponent] = useState('login')

    useEffect(() => {
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        this.knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        return () => {
            this.kbShow.remove()
            this.kbShow.remove()
            this.backHandler.remove()
        }
    }, [])

    handleBackPress = () => {
        //this.goBack(); // works best when the goBack is async
        setShowComponent('login')
        return true;
    }

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
                                <SocialMidiaSignup navigation={props.navigation} onPressLogin={() => setShowComponent('login')} />
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