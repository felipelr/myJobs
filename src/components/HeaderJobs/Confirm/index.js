import React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default Confirm = (props) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={props.onPress}>
                <Text style={{ color: 'white' }}>OK</Text>
            </TouchableOpacity>
        </View>
    )
}