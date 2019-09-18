import React from 'react'
import { ContainerContent, Title, ContainerItems } from './styles'
import ItemHighlight from '../ItemHighlight/index'

export default function Highlights(props) { 
    const { highlights } = props
    const { titulo } = props
    console.log(highlights)
    return (
        <ContainerContent>
            <Title>{titulo}</Title>
            <ContainerItems>
                {
                    highlights.map((item, index) => <ItemHighlight key={index} profissional={item} />)
                }
            </ContainerItems>
        </ContainerContent>
    )
}