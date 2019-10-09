import React from 'react' 

import { ContainerContent, Title, ContainerItems } from './styles'
import ItemHighlight from '../ItemHighlight/index' 

const ArrayVazio = () => {
    let rows = []
    for (let i = 0; i < 5; i++) {
        rows.push(i)
    }
    return rows.map((item) => <ItemHighlight key={item}  />) 
}

const Highlights = (props) => {
    const { titulo, highlights } = props
    console.log(JSON.stringify(highlights))
    return (
        !highlights.loading ?
            <ContainerContent>
                <Title>{titulo}</Title>
                <ContainerItems>
                    {
                        highlights.data.highlights.map((item) => <ItemHighlight key={item.id} profissional={item} />)
                    }
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
