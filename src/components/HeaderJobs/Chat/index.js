import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { purple } from '../../common/util/colors'

export default Chat = (props) => {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Icon name='chat' size={24} color={purple} />
        </TouchableOpacity>
    )
}