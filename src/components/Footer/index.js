import React from 'react'
import { ContainerFooter, FooterButton, ItemRounded } from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { white, gold, purple } from '../common/util/colors'

export default function Footer(props) {
    return (
        <ContainerFooter>
            <FooterButton>
                <Icon name="home" size={30} color={gold} />
            </FooterButton>
            <FooterButton>
                <Icon name="local-offer" size={30} color={white} />
            </FooterButton>
            <FooterButton>
                <ItemRounded backColor={white}>
                    <Icon name="favorite" size={22} color={purple} style={{ alignSelf: 'center' }} />
                </ItemRounded>
            </FooterButton>
            <FooterButton>
                <Icon name="gavel" size={30} color={white} />
            </FooterButton>
            <FooterButton>
                <Icon name="person-outline" size={30} color={white} />
            </FooterButton>
        </ContainerFooter>
    )
}