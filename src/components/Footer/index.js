import React from 'react'
import { ContainerFooter, FooterButton, ItemRounded } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { white, gold, purple } from '../common/util/colors'

export default function Footer(props) {
    return (
        <ContainerFooter>
            <FooterButton onPress={props.homeOnPress}>
                <Icon name="home" size={25} color={gold} />
            </FooterButton>
            <FooterButton onPress={props.offersOnPress}>
                <Icon name="local-offer" size={25} color={white} />
            </FooterButton>
            <FooterButton>
                <ItemRounded backColor={white}>
                    <Icon name="favorite" size={15} color={purple} style={{ alignSelf: 'center' }} />
                </ItemRounded>
            </FooterButton>
            <FooterButton onPress={props.servicesOnPress}>
                <Icon name="gavel" size={25} color={white} />
            </FooterButton>
            <FooterButton onPress={props.perfilOnPress}>
                <Icon name="person-outline" size={25} color={white} />
            </FooterButton>
        </ContainerFooter>
    )
}