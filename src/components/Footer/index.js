import React from 'react'
import { ContainerFooter, FooterButton, ItemRounded } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { white, gold, purple } from '../common/util/colors'

export default function Footer({ type, selected, ...props }) {

    const itemSelected = selected ? selected : 'home'
    const typeFooter = type ? type : 'client'

    if (typeFooter === 'client') {
        return (
            <ContainerFooter>
                <FooterButton onPress={props.homeOnPress}>
                    <Icon name="home" size={25} color={itemSelected === 'home' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.offersOnPress}>
                    <Icon name="local-offer" size={25} color={itemSelected === 'hire-service' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.favoriteOnPress}>
                    <ItemRounded backColor={white}>
                        <Icon name="favorite" style={{ alignSelf: 'center' }} size={15} color={itemSelected === 'favorite' ? gold : purple} />
                    </ItemRounded>
                </FooterButton>
                <FooterButton onPress={props.chatOnPress}>
                    <Icon name="chat" size={25} color={itemSelected === 'chat' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.perfilOnPress}>
                    <Icon name="person-outline" size={25} color={itemSelected === 'perfil' ? gold : white} />
                </FooterButton>
            </ContainerFooter>
        )
    }
    else {
        return (
            <ContainerFooter>
                <FooterButton onPress={props.homeOnPress}>
                    <Icon name="home" size={25} color={itemSelected === 'home' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.offersOnPress}>
                    <Icon name="local-offer" size={25} color={itemSelected === 'hire-service' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.favoriteOnPress}>
                    <ItemRounded backColor={white}>
                        <Icon name="favorite" style={{ alignSelf: 'center' }} size={15} color={itemSelected === 'favorite' ? gold : purple} />
                    </ItemRounded>
                </FooterButton>
                <FooterButton onPress={props.chatOnPress}>
                    <Icon name="chat" size={25} color={itemSelected === 'chat' ? gold : white} />
                </FooterButton>
                <FooterButton onPress={props.perfilOnPress}>
                    <Icon name="person-outline" size={25} color={itemSelected === 'perfil' ? gold : white} />
                </FooterButton>
            </ContainerFooter>
        )
    }
}