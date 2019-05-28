import React from 'react'
import { Avatar } from 'react-native-elements'
import { ContainerItem, BodyItem, FooterItem, TitleItem, DescriptionItem } from './styles'

export default function ItemHighlight(props) {
    return (
        <ContainerItem>
            <BodyItem>
                <Avatar rounded source={{
                    uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }} />
                <TitleItem>{props.title}</TitleItem>
                <DescriptionItem>{props.description}</DescriptionItem>
            </BodyItem>
            <FooterItem>

            </FooterItem>
        </ContainerItem>
    )
}