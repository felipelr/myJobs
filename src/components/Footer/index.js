import React from 'react'
import { ContainerFooter, FooterButton, ItemRounded } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { white, purple, gray } from '../common/util/colors'

export default function Footer({ type, selected, ...props }) {

    const itemSelected = selected ? selected : 'home'
    const typeFooter = type ? type : 'client'

    if (typeFooter === 'client') {
        return (
            <ContainerFooter>
                <FooterButton onPress={props.homeOnPress}>
                    <Icon name="home" size={25} color={itemSelected === 'home' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.callsOnPress}>
                    <Icon name="playlist-add-check" size={25} color={itemSelected === 'calls' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.favoriteOnPress}>
                    <ItemRounded backColor={itemSelected === 'favorite' ? purple : gray}>
                        <Icon name="favorite" style={{ alignSelf: 'center' }} size={15} color={white} />
                    </ItemRounded>
                </FooterButton>
                <FooterButton onPress={props.chatOnPress}>
                    <Icon name="chat" size={25} color={itemSelected === 'chat' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.perfilOnPress}>
                    <Icon name="person-outline" size={25} color={itemSelected === 'perfil' ? purple : gray} />
                </FooterButton>
            </ContainerFooter>
        )
    }
    else {
        return (
            <ContainerFooter>
                <FooterButton onPress={props.homeOnPress}>
                    <Icon name="home" size={25} color={itemSelected === 'home' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.callsOnPress}>
                    <Icon name="playlist-add-check" size={25} color={itemSelected === 'calls' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.professionalProfileOnPress}>
                    <Icon name="control-point" size={25} color={itemSelected === 'professional-profile' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.chatOnPress}>
                    <Icon name="chat" size={25} color={itemSelected === 'chat' ? purple : gray} />
                </FooterButton>
                <FooterButton onPress={props.perfilOnPress}>
                    <Icon name="person-outline" size={25} color={itemSelected === 'perfil' ? purple : gray} />
                </FooterButton>
            </ContainerFooter>
        )
    }
}