import React from 'react'
import {TouchableOpacity} from 'react-native'

import { VwContainerCard, VwTitleCard, VwSubTitle, VwRodape, VwRodapeContent, TxtTitle } from './styles'
import RatingJobs from '../RatingJobs/index' 

export default CardService = (props) => {

    const { titulo, descricao, avaliacao, qtdeAvaliacoes, select } = props

    return (
        <VwContainerCard>
            <VwTitleCard select={select}>
                <TxtTitle size={14} select={select} bold texto>
                    {titulo}
                </TxtTitle>
            </VwTitleCard>
            <VwSubTitle>
                <TxtTitle size={12} texto>
                    {descricao}
                </TxtTitle>
            </VwSubTitle>
            <VwRodape>
                <VwRodapeContent >
                    <RatingJobs avaliacao={avaliacao} qtdeAvaliacoes={qtdeAvaliacoes} />
                    <TouchableOpacity>
                        <TxtTitle size={12} bold>
                            Ver comentários
                        </TxtTitle>
                    </TouchableOpacity> 
                </VwRodapeContent>
            </VwRodape>
        </VwContainerCard>
    )
}