import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Chat = () => {
    return (
        <View style={{ flexDirection: 'row'}}>
            <TouchableOpacity> 
                <Icon name='list' size={24} color='white' />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: 15}}> 
                <Icon name='chat' size={24} color='white' />
            </TouchableOpacity>
        </View>
    )
}