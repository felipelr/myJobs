import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default Back = (props) => {
    return (
        <Icon name='arrow-back' size={24} color='white'  onPress={props.onPress} />
    )
} 