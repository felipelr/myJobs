import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { purple } from '../../common/util/colors'

export default Filter = () => {
    return (
        <TouchableOpacity>
            <Icon name='filter-list' size={24} color={purple} />
        </TouchableOpacity>
    )
} 