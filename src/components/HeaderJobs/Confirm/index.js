import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { purple } from '../../common/util/colors'

export default Confirm = (props) => {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Text style={{ color: purple }}>OK</Text>
        </TouchableOpacity>
    )
}