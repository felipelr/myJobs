import React from 'react' 
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default Filter = () => {
    return (
        <TouchableOpacity>
            <Icon name='filter-list' size={24} color='white' />
        </TouchableOpacity>
    )
} 