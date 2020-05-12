import React, { useState } from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'

import {
    VwContainerComentario,
    TxtTitle,
    VwContentComentario,
    VwContainerWhite,
} from './styles'

import { black } from '../../components/common/util/colors'
import RatingJobs from '../../components/RatingJobs'

const Comentario = ({ comment, ...props }) => {
    const [image, setImage] = useState((comment.photo && comment.photo.length > 0) ? { uri: comment.photo + '?v=' + new Date().getTime() } : { uri: '' })

    return (
        <VwContainerComentario>
            <VwContainerWhite>
                <View>
                    {image.uri.length > 0 &&
                        <Avatar
                            rounded
                            containerStyle={styles.containerStyle}
                            overlayContainerStyle={styles.overlayContainerStyle}
                            size={60}
                            source={{ uri: image.uri }} />}

                    {image.uri.length <= 0 &&
                        <Avatar
                            rounded
                            containerStyle={styles.containerStyle}
                            overlayContainerStyle={styles.overlayContainerStyle}
                            size={60}
                            icon={{ name: 'image' }} />}
                </View>
                <View style={{ flex: 1 }}>
                    <TxtTitle size={10} color={black}>
                        {comment.comment.length ? `"${comment.comment}"` : '...'}
                    </TxtTitle>
                    <VwContentComentario>
                        <RatingJobs avaliacao={comment.rating} />
                    </VwContentComentario>
                </View>
            </VwContainerWhite>

        </VwContainerComentario>
    )
}

export default Comentario


