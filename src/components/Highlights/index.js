import React from 'react'
import { ContainerContent, Title } from './styles'
import ItemHighlight from '../ItemHighlight/index'

export default function Highlights(props) {
    const { categoria } = props.destaques
    const { profissionais } = props.destaques
    return (
        <ContainerContent>
            <Title>Destaques da Categoria {categoria.descricao}</Title>
            {
                profissionais.map((item, index) => <ItemHighlight key={index} item={item} />)
            }
        </ContainerContent>
    )
}