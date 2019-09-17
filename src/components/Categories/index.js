import React from 'react';
import { connect } from 'react-redux'
import { ActivityIndicator, View } from 'react-native'

import { ContainerContent, ContainerItems, TextLoading } from './styles'
import CategorieItem from '../CategorieItem/index'
import { purple } from '../../components/common/util/colors'

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
            <View style={{ alignSelf: 'center' }}>
                <ActivityIndicator size='large' color={purple} />
                <TextLoading>Loading...</TextLoading>
            </View>
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



