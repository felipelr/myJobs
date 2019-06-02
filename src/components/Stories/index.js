import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { SvwContainerStories, VwContainerStorieItem, ImgStorieItem } from './styles' 

const Stories = (props) => {
    const { novaImagem } = props
    const { stories } = props

    return ( 
        <SvwContainerStories> 
            {
                novaImagem &&
                <VwContainerStorieItem>
                    <Icon name='camera-alt' size={80} color='white' />
                </VwContainerStorieItem>
            }
            {stories.map((item) => (
                <ImgStorieItem key={item.id} imagem={item.imagem} />
            ))}
        </SvwContainerStories>
    )
}

export default Stories;


