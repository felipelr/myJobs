import React from 'react'
import { Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    SvwContainerStories,
    VwContainerStorieItem,
    VwContainerStorieItemEmpty,
    TextInfo,
} from './styles'

import { lightgray } from '../common/util/colors'

const Stories = ({ loading, novaImagem, stories, onPressNewStory, onPressStory, ...props }) => {

    return (
        <SvwContainerStories>
            {
                novaImagem &&
                <VwContainerStorieItemEmpty onPress={onPressNewStory}>
                    <Icon name='camera-alt' size={80} color='white' />
                </VwContainerStorieItemEmpty>
            }
            {stories.map((item, index) => (
                <VwContainerStorieItem key={item.id} onPress={() => onPressStory(item.photo, index)}>
                    <Image source={{ uri: item.photo }} style={{ width: '100%', height: '100%', borderRadius: 10 }} />
                </VwContainerStorieItem>
            ))}

            {(!loading && !stories.length) && <TextInfo>Não há stories deste perfil...</TextInfo>}
            
            {loading && <React.Fragment>
                <VwContainerStorieItem>
                    <Text style={{ backgroundColor: lightgray, width: '100%', height: '100%', borderRadius: 10 }} />
                </VwContainerStorieItem>
                <VwContainerStorieItem>
                    <Text style={{ backgroundColor: lightgray, width: '100%', height: '100%', borderRadius: 10 }} />
                </VwContainerStorieItem>
                <VwContainerStorieItem>
                    <Text style={{ backgroundColor: lightgray, width: '100%', height: '100%', borderRadius: 10 }} />
                </VwContainerStorieItem>
            </React.Fragment>}
        </SvwContainerStories>
    )
}

export default Stories