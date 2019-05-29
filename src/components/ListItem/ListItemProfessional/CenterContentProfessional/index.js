import React from 'react'
import { View } from 'react-native'
import RatingJobs from '../../../RatingJobs/index'
import { TitleProfessional, InfoProfessional } from './styles'

export default function CenterContentProfessional(props) {
    const { titulo } = props
    const { descricao } = props
    const { avaliacao } = props
    const { qtdeAvaliacoes } = props
    return (
        <View>
            <TitleProfessional>{titulo}</TitleProfessional>
            <InfoProfessional>{descricao}</InfoProfessional>
            <RatingJobs avaliacao={avaliacao} qtdeAvaliacoes={qtdeAvaliacoes} />
        </View>
    )
}