import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, Rating } from 'react-native-elements'
import { ContainerItem, BodyItem, FooterItem, TitleItem, DescriptionItem, ContentInfo, RatingText } from './styles'
import { white } from '../common/util/colors'
import assets from './assets'

export default function ItemHighlight(props) {
    const { item } = props
    return (
        <ContainerItem>
            <BodyItem>
                <Avatar 
                    containerStyle={{ alignSelf: 'center' }} 
                    rounded
                    size={60}
                    source={{
                        uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }} />
                <ContentInfo>
                    <TitleItem>{item.nome}</TitleItem>
                    <DescriptionItem>{item.descricao}</DescriptionItem>
                </ContentInfo>
                <Icon name="chevron-right" size={30} color={white} style={{ alignSelf: 'center'}} />
            </BodyItem>
            <FooterItem>
                <Rating startingValue={3} imageSize={10} readonly type='custom' ratingImage={assets.star} />
                <RatingText>143K</RatingText>
            </FooterItem>
        </ContainerItem>
    )
}