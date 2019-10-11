import React from 'react'
import { ContainerTextInput, TextInputCustom, ViewRed, ViewBlack } from './styles'

export default function TextInputJobs({ invalidValue, name, style, onChangeText, ...props }) {
    return (
        <ContainerTextInput style={style}>
            <TextInputCustom onChangeText={(text) => onChangeText(name, text)} {...props} />
            {invalidValue && <ViewRed />}
            {!invalidValue && <ViewBlack />}
        </ContainerTextInput>
    )
}