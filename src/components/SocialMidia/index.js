import React, { useState } from 'react'
import { Image } from 'react-native'
import { LoginManager, AccessToken } from 'react-native-fbsdk'

import { urlFacebookGraph } from '../../config/config'
import { ContainerSocialMidia, SocialMidiaButton } from './styles'
import assets from './assets'

export default function SocialMidia(props) {
    const [user, setUser] = useState({})

    facebookLoginRequest = () => {
        LoginManager.logInWithPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled")
                } else {
                    console.log("Login success with permissions: " + result.grantedPermissions.toString())
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data
                        fetch(urlFacebookGraph + '/me?fields=email,name,friends&access_token=' + accessToken)
                            .then((response) => response.json())
                            .then((json) => {
                                setUser({
                                    name: json.name,
                                    email: json.email,
                                    facebook_id: json.id,
                                    facebook_friends: json.friends
                                })
                            })
                            .catch(() => {
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