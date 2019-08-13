import React, { useState, useEffect } from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

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
    }, [user])

    facebookLoginRequest = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled")
                } else {
                    console.log("Login success with permissions: " + result.grantedPermissions.toString())
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                        fetch(urlFacebookGraph + '/me?fields=email,name,birthday,gender&access_token=' + accessToken)
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
                            .catch((error) => {
                                reject('ERROR GETTING DATA FROM FACEBOOK')
                            })
                    })
                }
            },
            function (error) {
                console.log("Login fail with error: " + error)
            }
        )
    }

    return (
        <ContainerSocialMidia>
            <SocialMidiaButton onPress={facebookLoginRequest}>
                <Image source={assets.facebook} />
            </SocialMidiaButton>
            <SocialMidiaButton>
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