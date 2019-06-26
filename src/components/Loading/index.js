import React from 'react'
import { ActivityIndicator } from 'react-native'

import { ViewContainerBack, ViewContainer, TextLoading } from './styles'

export default function Loading(props) {
    const { size } = props
    const { color } = props
    const { text } = props
    const height = props.height ? props.height : 150;
    return (
        <ViewContainerBack height={height}>
            <ViewContainer>
                <ActivityIndicator size={size ? size : 'large'} color={color ? color : "#0000ff"} />
                <TextLoading>{text ? text : 'Loading...'}</TextLoading>
            </ViewContainer>
        </ViewContainerBack>

    )
}