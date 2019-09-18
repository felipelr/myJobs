import React from 'react';
import { connect } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'

import { ContainerContent, ContainerItems, TextLoading } from './styles'
import CategorieItem from '../CategorieItem/index'
import { purple } from '../../components/common/util/colors'

const ArrayVazio = () => {
    let rows = []
    for (let i = 0; i < 10; i++) {
        rows.push(i)
    }
    return rows.map((item) => <CategorieItem key={item} />) 
}

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
            <ContainerContent>
                <ContainerItems>
                     <ArrayVazio />
                </ContainerItems>
            </ContainerContent>
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



