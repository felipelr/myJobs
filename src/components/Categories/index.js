import React from 'react';  
import { connect } from 'react-redux'

import { ContainerContent, ContainerItems } from './styles'
import CategorieItem from '../CategorieItem/index'

const Categories = (props) => {   
    return (
        <ContainerContent>
            <ContainerItems>
                {
                    props.data.map((item) => (
                        <CategorieItem key={item.id} categoria={item} />
                    ))
                }       
            </ContainerItems>
        </ContainerContent>
    )
}

const mapStateToProps = (state, ownProps) => {
    return { 
        data: state.categoria.data,
        ownProps: ownProps
    }
}
 
export default connect(mapStateToProps, null)(Categories)



