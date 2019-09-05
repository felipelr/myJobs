import React from 'react'
import { Button } from 'react-native'
import { purple } from '../common/util/colors'

export default function ButtonPurple(props) {
    const { onPress } = props
    return (
        <Button
            onPress={onPress}
            title={props.children}
            color={purple}
        />
    )
}