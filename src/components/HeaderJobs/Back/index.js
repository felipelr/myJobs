import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default Back = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} >
            <Icon name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
    )
} 