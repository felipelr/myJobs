import React from 'react'
import { Text, View, Image } from 'react-native'

import styles from './styles'

export default Title = (props) => {
    return (
        <View style={styles.content}>
            <Image source={props.imagem} />  
            <Text style={[styles.title, props.imagem != null && { marginLeft: 15 }]}>
                {props.title}
            </Text>
        </View>
    )
}

