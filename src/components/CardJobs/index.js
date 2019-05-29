import React from 'react'
import { ContainerCard } from './styles'
import { white } from '../common/util/colors'

export default function CardJobs(props) {
    const { backColor } = props
    const { width } = props
    const { height } = props
    const { opacity } = props
    return (
        <ContainerCard
            backColor={backColor ? backColor : white}
            width={width ? width : '300'}
            height={height ? height : '300'}
            opacity={opacity ? opacity : 1}>
            {props.children}
        </ContainerCard>
    )
}