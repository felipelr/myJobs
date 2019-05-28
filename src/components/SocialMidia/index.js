import React from 'react'
import { Image } from 'react-native'
import { ContainerSocialMidia, SocialMidiaButton } from './styles'
import assets from './assets'

export default function SocialMidia(props) {
    return (
        <ContainerSocialMidia>
            <SocialMidiaButton>
                <Image source={assets.facebook} />
            </SocialMidiaButton>
            <SocialMidiaButton>
                <Image source={assets.googlemais} />
            </SocialMidiaButton>
        </ContainerSocialMidia>
    )
}