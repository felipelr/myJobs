import React from 'react'

import {
    VwContainerCard,
    VwTitleCard,
    VwSubTitle,
    VwRodape,
    VwRodapeContent,
    TxtTitle
} from './styles'
import RatingJobs from '../RatingJobs/index'

export default CardService = ({ service, select, ...props }) => {

    return (
        <VwContainerCard onPress={props.onPress}>
            <VwTitleCard select={select}>
                <TxtTitle size={14} select={select} bold texto>
                    {service.title}
                </TxtTitle>
            </VwTitleCard>
            <VwSubTitle>
                <TxtTitle size={12} texto>
                    {service.description}
                </TxtTitle>
            </VwSubTitle>
            <VwRodape>
                <VwRodapeContent >
                    <RatingJobs
                        avaliacao={service.rating}
                        qtdeAvaliacoes={service.amount_ratings} />
                    <TxtTitle size={12} bold>
                        Ver comentários
                    </TxtTitle>
                </VwRodapeContent>
            </VwRodape>
        </VwContainerCard>
    )
}