import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'

import {
    SvwContainerComentarios,
    VwContainerComentario,
    VwEmpty,
    VwEmpty2,
    TextInfo,
} from './styles'

import Comentario from '../../components/Comentario/index'

const ComentariosList = ({ comments, loading, ...props }) => {
    return (
        <SvwContainerComentarios>
            <View style={{ minHeight: 90 }}>
                {
                    !loading && comments.map((item) => (
                        <Comentario
                            key={item.id}
                            comment={item} />
                    ))
                }
                {
                    (!loading && !comments.length) && 
                    <TextInfo>Não há comentários deste serviço...</TextInfo>
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
            </View>

        </SvwContainerComentarios>
    )
}

ComentariosList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default ComentariosList;