import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar } from 'react-native-elements'

import { ContainerItem, BodyItem, TitleItem, DescriptionItem, ContentInfo, Services, ServicesAmount, TextoVazio, DescricaoVazia, styles } from './styles'
import { white } from '../common/util/colors'

import { heightPercentageToDP } from '../../components/common/util/dimensions'
import RatingJobs from '../RatingJobs'

export default function ItemHighlight(props) {
    const { profissional } = props
    return (
        <ContainerItem gray={(profissional ? false : true)}>
            <BodyItem>
                {profissional &&
                    <Avatar
                        containerStyle={styles.containerStyle}
                        rounded
                        size={heightPercentageToDP('10%')}
                        source={{
                            uri: profissional.imagem,
                        }} />
                }
                {!profissional &&
                    <Avatar
                        containerStyle={styles.containerStyle}
                        rounded
                        size={heightPercentageToDP('10%')} />
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
                <RatingJobs backPurple={true} avaliacao={profissional.rating} qtdeAvaliacoes={profissional.amount_ratings} />
            }

        </ContainerItem>
    )
}