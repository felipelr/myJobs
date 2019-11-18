import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'

import {
    SvwContainerComentarios,
    VwContainerComentario,
    VwEmpty,
    VwEmpty2
} from './styles'
import Comentario from '../../components/Comentario/index'

const ComentariosList = ({ comments, loading, ...props }) => {
    return (
        <SvwContainerComentarios>
            {
                !loading && comments.map((item) => (
                    <Comentario
                        key={item.id}
                        comment={item} />
                ))
            }
            {
                loading && (
                    <VwContainerComentario>
                        <View>
                            <Avatar
                                rounded
                                size={60} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <VwEmpty />
                            <VwEmpty2 />
                        </View>
                    </VwContainerComentario>
                )
            }
        </SvwContainerComentarios>
    )
}

ComentariosList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default ComentariosList;


