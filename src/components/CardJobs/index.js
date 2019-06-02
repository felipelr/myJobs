import React from 'react'
import { ContainerCard } from './styles'
import { white } from '../common/util/colors'

export default function CardJobs(props) {
    const { backColor } = props
    const { width } = props
    const { height } = props
    const { opacity } = props
    const { paddingCard } = props
    const { borderRadius } = props
    return (
        <ContainerCard
            backColor={backColor ? backColor : white}
            width={width ? width : 300}
            height={height ? height : 300}
            opacity={opacity ? opacity : 1}
            paddingCard={paddingCard ? paddingCard : 16}
            borderRadius={borderRadius ? borderRadius : 10}>
            {props.children}
        </ContainerCard>
    )
}