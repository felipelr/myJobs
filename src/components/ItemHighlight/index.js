import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { ContainerItem, BodyItem, TitleItem, DescriptionItem, ContentInfo, Services, ServicesAmount, TextoVazio, DescricaoVazia, styles } from './styles'
import { white } from '../common/util/colors'



export default function ItemHighlight(props) {
    const { profissional } = props
    return (
        <ContainerItem gray={(profissional ? false : true)}>
            <BodyItem>
                {profissional &&
                    <Avatar
                        containerStyle={styles.containerStyle}
                        rounded
                        size={55}
                        source={{
                            uri: profissional.imagem,
                        }} />
                }
                {!profissional &&
                    <Avatar
                        containerStyle={styles.containerStyle}
                        rounded
                        size={55} />
                }

                <ContentInfo>
                    {profissional && <TitleItem>{profissional.name}</TitleItem>}
                    {!profissional && <TextoVazio />}

                    {profissional && <DescriptionItem>{profissional.description}</DescriptionItem>}
                    {!profissional && <DescricaoVazia />}

                </ContentInfo>
                <Icon name="chevron-right" size={30} color={white} style={{ alignSelf: 'center' }} />
            </BodyItem>
            {
                profissional &&
                <Services>
                    Oferece <ServicesAmount>{profissional.qtdeServices}</ServicesAmount> {profissional.qtdeServices > 1 ? 'serviços' : 'serviço'}
                </Services>
            }

        </ContainerItem>
    )
}