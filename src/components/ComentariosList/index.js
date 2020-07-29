import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { View, ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements'

import {
    SvwContainerComentarios,
    VwContainerComentario,
    VwEmpty,
    VwEmpty2,
    TextInfo,
} from './styles'

import Comentario from '../Comentario'
import { purple } from '../common/util/colors'

const ComentariosList = ({ comments, loading, contentSize, ...props }) => {
    const [commentsArr, setCommentsArr] = useState([])    
    const [loadingComments, setLoadingComments] = useState(false)

    const sizePage = 10;

    useEffect(() => {
        setCommentsArr([])
        loadComments()
    }, [comments])

    useEffect(() => {
        if (contentSize > sizePage) {
            loadMoreComments()
        }
    }, [contentSize])

    const loadMoreComments = () => {
        setLoadingComments(true)
        loadComments()
        setLoadingComments(false)
    }

    const loadComments = () => {
        const filteredComments = comments.filter(filterComments)
        setCommentsArr(filteredComments)
    }

    const filterComments = (item, index, arr) => {
        if (index < (arr.length - contentSize))
            return false

        return true
    }

    return (
        <SvwContainerComentarios>
            <View style={{ minHeight: 90 }}>
                {
                    !loading && commentsArr.map((item) => (
                        <Comentario
                            key={item.id}
                            comment={item} />
                    ))
                }
                {
                    (!loading && !commentsArr.length) &&
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
                {loadingComments && <ActivityIndicator size="small" color={purple} style={{ alignSelf: "center" }} />}
            </View>

        </SvwContainerComentarios>
    )
}

ComentariosList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default ComentariosList;