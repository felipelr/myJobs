import React from 'react'

import { ContainerContent, Title, ContainerItems } from './styles'
import ItemHighlight from '../ItemHighlight/index'
import HighlightsBuy from '../HighlightsBuy'

const ArrayVazio = () => {
    let rows = []
    for (let i = 0; i < 5; i++) {
        rows.push(i)
    }
    return rows.map((item) => <ItemHighlight key={item} />)
}

const PreencherAnuncios = (props) => {
    let { subcategorie, qtdePreenchida } = props
    let stop = 5 - qtdePreenchida;
    let anuncios = []
    for (let i = 0; i < stop; i++) {
        anuncios.push(<HighlightsBuy key={i} subcategorie={subcategorie} />);
    }
    return anuncios;
}

const Highlights = (props) => {
    const subcategorie = props.subcategorie
    const { titulo, highlights } = props
    return (
        !highlights.loading && highlights.data && highlights.data.highlights ?
            <ContainerContent>
                <Title>{titulo}</Title>
                <ContainerItems>
                    {
                        highlights.data.highlights.map((item) => <ItemHighlight key={item.id} profissional={item} />)
                    }
                    <PreencherAnuncios qtdePreenchida={highlights.data.highlights.length} subcategorie={subcategorie} />
                </ContainerItems>
            </ContainerContent>
            :
            <ContainerContent>
                <Title>Loading...</Title>
                <ContainerItems>
                    {
                        <ArrayVazio />
                    }
                </ContainerItems>
            </ContainerContent>
    )
}



export default Highlights
