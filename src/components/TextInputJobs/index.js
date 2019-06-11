import React from 'react'
import { ContainerTextInput, TextInputCustom } from './styles'

export default function TextInputJobs(props) {
    const { placeholder } = props
    const { textContentType } = props
    const { secureTextEntry } = props
    const { value } = props
    const { onChangeText } = props
    return (
        <ContainerTextInput>
            <TextInputCustom
                placeholder={placeholder ? placeholder : ''}
                textContentType={textContentType ? textContentType : 'none'}
                secureTextEntry={secureTextEntry ? secureTextEntry : false}
                value={value}
                onChangeText={onChangeText}>
            </TextInputCustom>
        </ContainerTextInput>
    )
}