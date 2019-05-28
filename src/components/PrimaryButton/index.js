import React from 'react'
import { TouchableOpacity } from 'react-native'
import { PrimaryButtonText } from './styles'

export default function PrimaryButton(props) {
    return (
        <TouchableOpacity>
            <PrimaryButtonText>{props.text}</PrimaryButtonText>
        </TouchableOpacity>
    )
}