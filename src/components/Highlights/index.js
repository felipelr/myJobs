import React from 'react'
import { connect } from 'react-redux' 

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
    return (
        !props.loading ?
            <ContainerContent>
                <Title>{titulo}</Title>
                <ContainerItems>
                    {
                        highlights.map((item) => <ItemHighlight key={item.id} profissional={item} />)
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

const mapStateToProps = (state, ownProps) => {
    return {
        highlights: state.highlights.highlights,
        loading: state.highlights.loading,
        ownProps: ownProps
    }
}

export default connect(mapStateToProps, null)(Highlights)
