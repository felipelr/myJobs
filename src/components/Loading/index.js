import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { ViewContainerBack, ViewContainer, TextLoading } from './styles'

import { red, green, purple } from '../common/util/colors'

export default function Loading(props) {
    const { size } = props
    const { color } = props
    const { text } = props
    const height = props.height ? props.height : 150
    const success = props.success ? true : false
    const error = props.error ? true : false
    return (
        <ViewContainerBack height={height}>
            <ViewContainer>
                {(!success && !error) &&
                    <View>
                        <ActivityIndicator size={size ? size : 'large'} color={color ? color : "#0000ff"} />
                        <TextLoading color={purple}>{text ? text : 'Loading...'}</TextLoading>
                    </View>}
                {success &&
                    <View>
                        <ActivityIndicator size={size ? size : 'large'} color={green} />
                        <TextLoading color={green}>{text ? text : 'Sucesso'}</TextLoading>
                    </View>}
                {error &&
                    <View>
                        <ActivityIndicator size={size ? size : 'large'} color={red} />
                        <TextLoading color={red}>{text ? text : 'Falha'}</TextLoading>
                    </View>}
            </ViewContainer>
        </ViewContainerBack>

    )
}