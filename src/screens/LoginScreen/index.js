import React from 'react'
import { TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { PrimaryButton } from '../../components/common/layout/styles'
import {
    Container, ContainerPurple, ContainerGray, ContainerContent,
    ContainerLogin, LoginTitle, LoginTextInput, ContainerTextInput, LoginButtonContainer,
    ContentNewUser, NewUserText, NewUserButton, NewUserButtonText, ContainerFooter, CopyRightText,
    ContainerSocialMidia, SocialMidiaButton, SocialMidiaText
} from './styles'
import assets from './assets'

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
                        <ContainerPurple />
                        <ContainerGray />
                        <ContainerContent>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ flex: 3 }}>
                                <ContainerLogin>
                                    <LoginTitle>Login</LoginTitle>
                                    <ContainerTextInput>
                                        <LoginTextInput placeholder='Usuário'></LoginTextInput>
                                    </ContainerTextInput>
                                    <ContainerTextInput>
                                        <LoginTextInput placeholder='Senha' textContentType='password' secureTextEntry={true}></LoginTextInput>
                                    </ContainerTextInput>
                                    <TouchableOpacity>
                                        <LoginButtonContainer>
                                            <PrimaryButton>Entrar</PrimaryButton>
                                        </LoginButtonContainer>
                                    </TouchableOpacity>
                                    <ContentNewUser>
                                        <NewUserText>Novo por aqui?</NewUserText>
                                        <NewUserButton>
                                            <NewUserButtonText>Faça seu cadastro</NewUserButtonText>
                                        </NewUserButton>
                                    </ContentNewUser>
                                </ContainerLogin>
                                <SocialMidiaText>Entrar com</SocialMidiaText>
                                <ContainerSocialMidia>
                                    <SocialMidiaButton>
                                        <Image source={assets.facebook} />
                                    </SocialMidiaButton>
                                    <SocialMidiaButton>
                                        <Image source={assets.googlemais} />
                                    </SocialMidiaButton>
                                </ContainerSocialMidia>
                            </View>
                        </ContainerContent>
                        <ContainerFooter>
                            <CopyRightText>Copyright (c) 2019 Santos & Lima All Rights Reserved</CopyRightText>
                        </ContainerFooter>
                    </View>
                </Container>
            </KeyboardAvoidingView>
        )
    }
}

LoginScreen.navigationOptions = {
    header: null
}
