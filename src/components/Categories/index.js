import React from 'react';
import { connect } from 'react-redux'
import {Text} from 'react-native'

import { ContainerContent, ContainerItems } from './styles'
import CategorieItem from '../CategorieItem/index'

const Categories = (props) => {
    return ( 
            !props.loading ?
                <ContainerContent>
                    <ContainerItems>
                        {
                            props.data.map((item) => (
                                <CategorieItem key={item.id} categoria={item} />
                            ))
                        }
                    </ContainerItems>
                </ContainerContent> 
            :
            <Text>loading...</Text>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.categoria.data,
        loading: state.categoria.loading,
        ownProps: ownProps
    }
}

export default connect(mapStateToProps, null)(Categories)



