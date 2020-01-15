import React, { useState, useEffect } from 'react'
import { View, KeyboardAvoidingView, Platform, Keyboard, BackHandler } from 'react-native'
import { connect } from 'react-redux'

import ActionCreators from '../../store/actionCreators'

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

function LoginScreen(props) {
    const [showComponent, setShowComponent] = useState('login')

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            backHandler.remove()
        }
    }, [])

    const handleBackPress = async () => {
        setShowComponent('login')
        return true;
    }

    const showSignup = () => {
        props.loginCleanError()
        setShowComponent('signup')
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
                                <Login navigation={props.navigation} onPressSignup={showSignup} />
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

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
        ownProps: ownProps,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginCleanError: () => dispatch(ActionCreators.loginCleanError()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)