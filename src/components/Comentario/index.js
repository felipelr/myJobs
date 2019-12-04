import React, { useState } from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'

import {
    VwContainerComentario,
    TxtTitle,
    VwContentComentario
} from './styles'

import { black } from '../../components/common/util/colors'
import RatingJobs from '../../components/RatingJobs'

const Comentario = ({ comment, ...props }) => {
    const [image, setImage] = useState((comment.photo && comment.photo.length > 0) ? { uri: comment.photo + '?v=' + new Date().getTime() } : { uri: '' })

    return (
        <VwContainerComentario>
            <View>
                {image.uri.length > 0 &&
                    <Avatar
                        rounded
                        containerStyle={styles.containerStyle}
                        overlayContainerStyle={styles.overlayContainerStyle}
                        source={{ uri: image.uri }}
                        size={60} />}

                {image.uri.length <= 0 &&
                    <Avatar
                        rounded
                        containerStyle={styles.containerStyle}
                        overlayContainerStyle={styles.overlayContainerStyle}
                        size={60} />}
            </View>
            <View style={{ flex: 1 }}>
                <TxtTitle size={10} color={black}>
                    "{comment.comment}"
                </TxtTitle>
                <VwContentComentario>
                    <RatingJobs avaliacao={comment.rating} />
                </VwContentComentario>
            </View>
        </VwContainerComentario>
    )
}

export default Comentario


