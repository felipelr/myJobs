import React from 'react'

import { ViewContainer, TextInputWhite } from './styles'

export default function Toast(props) {

    return (
        <ViewContainer>
            <TextInputWhite>{props.mensagem}</TextInputWhite>
        </ViewContainer>
    )
}