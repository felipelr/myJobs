import React from 'react' 
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Back = () => {
    return (
        <TouchableOpacity>
            <Icon name='arrow-back' size={24} color='white' />
        </TouchableOpacity>
    )
} 