import React from 'react'
import { TextButton, Button } from './styles'

export default function ButtonPurple(props) {
    const { onPress } = props
    return (
        <Button onPress={onPress}>
            <TextButton>{props.children}</TextButton>
        </Button>
    )
}