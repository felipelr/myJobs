import React from 'react'

import { TextErrorMessage } from './styles'

export default function TextError(props) {

    return (
        <TextErrorMessage>{props.children}</TextErrorMessage>
    )
}