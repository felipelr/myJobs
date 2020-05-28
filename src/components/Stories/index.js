import React, { useRef, useEffect } from 'react'
import { Text, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    SvwContainerStories,
    VwContainerStorieItem,
    VwContainerStorieItemEmpty,
    TextInfo,
} from './styles'

import { lightgray } from '../common/util/colors'

const Stories = ({ loading, novaImagem, stories, onPressNewStory, onPressStory, onCloseToEnd, ...props }) => {
    const scrollRef = useRef()

    useEffect(() => {
        if (loading)
            goToTop()
    }, [loading])

    const isCloseToRight = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToRight = 10;
        return layoutMeasurement.width + contentOffset.x >= contentSize.width - paddingToRight;
    };

    const goToTop = () => {
        scrollRef.current.scrollTo({ x: 0, y: 0, animated: true })
    }

    return (
        <SvwContainerStories
            ref={s => { scrollRef.current = s; }}
            onScroll={({ nativeEvent }) => {
                if (isCloseToRight(nativeEvent)) {
                    onCloseToEnd()
                }
            }}
            scrollEventThrottle={400}>
            {
                novaImagem &&
                <VwContainerStorieItemEmpty onPress={onPressNewStory}>
                    <Icon name='camera-alt' size={80} color='white' />
                </VwContainerStorieItemEmpty>
            }
            {stories.map((item, index) => (
                <VwContainerStorieItem key={item.id} onPress={() => onPressStory(item)}>
                    <Image
                        source={{ uri: item.photo }}
                        style={{ width: 110, height: 170, borderRadius: 10, backgroundColor: lightgray }} />
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