import React from 'react'
import { ContainerTextInput, TextInputCustom } from './styles'

export default function TextInputJobs(props) {
    const { placeholder } = props
    const { textContentType } = props
    const { secureTextEntry } = props
    const { value } = props
    const { onChangeText } = props
    const { keyboardType } = props
    const { invalidValue } = props

    return (
        <ContainerTextInput>
            <TextInputCustom
                placeholder={placeholder ? placeholder : ''}
                textContentType={textContentType ? textContentType : 'none'}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType ? keyboardType : 'default'}
                invalidValue={invalidValue ? true : false}>
            </TextInputCustom>
        </ContainerTextInput>
    )
}