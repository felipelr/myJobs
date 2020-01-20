import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin'

import ActionCreators from '../../store/actionCreators'

import { urlFacebookGraph } from '../../config/config'
import { ContainerSocialMidia, SocialMidiaButton } from './styles'
import assets from './assets'

function SocialMidia(props) {
    const [user, setUser] = useState({})

    useEffect(() => {
        if (user.facebook_id) {
            props.socialMidiaSignupInit(user)
            props.ownProps.goToSocialMidiaSignup()
        }
        else if (user.google_id) {
            props.socialMidiaSignupInit(user)
            props.ownProps.goToSocialMidiaSignup()
        }
    }, [user])

    facebookLoginRequest = () => {
        try {
            LoginManager.logInWithPermissions(["public_profile", "email"]).then(
                function (result) {
                    if (result.isCancelled) {
                        console.log("Login cancelado")
                    } else {
                        console.log("Login success with permissions: " + result.grantedPermissions.toString())
                        AccessToken.getCurrentAccessToken().then((data) => {
                            const { accessToken } = data
                            fetch(urlFacebookGraph + '/me?fields=name,birthday,gender,email&access_token=' + accessToken)
                                .then((response) => response.json())
                                .then((json) => {
                                    setUser({
                                        facebook_id: json.id,
                                        name: json.name,
                                        email: json.email,
                                        birthday: json.birthday,
                                        gender: (json.gender === 'male' ? 'MASCULINO' : json.gender === 'female' ? 'FEMININO' : 'OUTRO')
                                    })
                                })
                                .catch(() => {
                                    reject('Não foi possível receber as informações do Facebook.')
                                })
                        })
                    }
                },
                function (error) {
                    alert("Não foi possível realizar o login: " + error)
                }
            )
        } catch (ex) {
            alert("Não foi possível realizar o login: " + ex.message)
        }
    }

    signInGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices()
            const userInfo = await GoogleSignin.signIn()
            setUser({
                google_id: userInfo.user.id,
                name: userInfo.user.name,
                email: userInfo.user.email,
                birthday: '',
                gender: 'MASCULINO',
            })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                //alert("user cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                //alert("operation (f.e. sign in) is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert("O Play Services não está instaldo.")
            } else {
                alert("Não foi possível realizar o login: " + error.message)
            }
        }
    }

    GoogleSignin.configure({
        scopes: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ],
        webClientId: '333819460701-gqm646pnle9tcbotppnudr3vv4cjnglm.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER    
    })

    return (
        <ContainerSocialMidia>
            <SocialMidiaButton onPress={facebookLoginRequest}>
                <Image source={assets.facebook} />
            </SocialMidiaButton>
            <SocialMidiaButton onPress={signInGoogle}>
                <Image source={assets.googlemais} />
            </SocialMidiaButton>
        </ContainerSocialMidia>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        socialMidiaSignup: state.socialMidiaSignup,
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        socialMidiaSignupInit: (user) => dispatch(ActionCreators.socialMidiaSignupInit(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialMidia)