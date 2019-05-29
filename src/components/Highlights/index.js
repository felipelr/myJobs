import React from 'react'
import { ContainerContent, Title, ContainerItems } from './styles'
import ItemHighlight from '../ItemHighlight/index'

export default function Highlights(props) {
    const { categoria } = props.destaques
    const { profissionais } = props.destaques
    const { titulo } = props
    return (
        <ContainerContent>
            <Title>{titulo}</Title>
            <ContainerItems>
                {
                    profissionais.map((item, index) => <ItemHighlight key={index} profissional={item} />)
                }
            </ContainerItems>
        </ContainerContent>
    )
}