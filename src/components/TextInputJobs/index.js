import React from 'react'
import { ContainerTextInput, TextInputCustom, ViewRed, ViewBlack } from './styles'

export default function TextInputJobs(props) {
    const { placeholder } = props
    const { textContentType } = props
    const { secureTextEntry } = props
    const { value } = props
    const { onChangeText } = props
    const { keyboardType } = props
    const { invalidValue } = props
    const { nameField } = props

    return (
        <ContainerTextInput>
            <TextInputCustom
                placeholder={placeholder ? placeholder : ''}
                textContentType={textContentType ? textContentType : 'none'}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType ? keyboardType : 'default'}>
            </TextInputCustom>
            {(nameField === invalidValue && nameField) && <ViewRed />}
            {(nameField !== invalidValue || !nameField) && <ViewBlack />}
        </ContainerTextInput>
    )
}