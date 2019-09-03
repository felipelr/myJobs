import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Back = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Icon name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
    )
} 