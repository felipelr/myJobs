import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default Confirm = (props) => {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Text style={{ color: 'white' }}>OK</Text>
        </TouchableOpacity>
    )
}