import React from 'react'
import { Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    SvwContainerStories,
    VwContainerStorieItem,
    VwContainerStorieItemEmpty
} from './styles'

const Stories = ({ novaImagem, stories, onPressNewStory, ...props }) => {

    handleStoryClick = (story) => {

    }

    return (
        <SvwContainerStories>
            {
                novaImagem &&
                <VwContainerStorieItemEmpty onPress={onPressNewStory}>
                    <Icon name='camera-alt' size={80} color='white' />
                </VwContainerStorieItemEmpty>
            }
            {stories.map((item) => (
                <VwContainerStorieItem key={item.id} onPress={() => handleStoryClick(item)}>
                    <Image source={{ uri: item.photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </VwContainerStorieItem>
            ))}
        </SvwContainerStories>
    )
}

export default Stories