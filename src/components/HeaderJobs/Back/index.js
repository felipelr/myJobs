import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { purple } from '../../common/util/colors'

export default Back = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} >
            <Icon name='arrow-back' size={24} color={purple} />
        </TouchableOpacity>
    )
} 