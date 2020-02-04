import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { ContainerItem, BodyItem, TitleItem, DescriptionItem, ContentInfo, Services, styles } from './styles'
import { white } from '../common/util/colors'


const HighlightsBuy = (props) => {
    return (
        <ContainerItem gray={true}>
            <BodyItem>
                <Avatar
                    containerStyle={styles.containerStyle}
                    rounded
                    size='large'
                    icon={{ name: 'public', type: 'material-icons' }} />

                <ContentInfo>
                    <TitleItem>Aumente sua visibilidade!</TitleItem>
                    {
                        props.subcategorie ?
                            <DescriptionItem>Já pensou você aqui entre os 5 mais tops dessa subcategoria ? Clique e anuncie!</DescriptionItem>
                            :
                            <DescriptionItem>Já pensou você aqui entre os 5 mais tops do aplicativo todo ? Clique e anuncie!</DescriptionItem>
                    }
                </ContentInfo>
                <Icon name="chevron-right" size={30} color={white} style={{ alignSelf: 'center' }} />
            </BodyItem>
            <Services>
                disponível por tempo limitado!
            </Services>
        </ContainerItem>
    )
}

export default HighlightsBuy