import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, gray } from '../common/util/colors'

export const ScrollViewContainerForm = styled.ScrollView.attrs({
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``

export const ViewContainer = styled.View`
    padding: 5px;
    padding-bottom: 50px;
`

export const TextSignUpTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 5px;
    font-family: 'SF-Pro-Text-Regular';
`

export const TextSignUpSubtitle = styled.Text`
    font-size: 16px;
    color: ${gray};
    text-align: center;
    padding-bottom: 5px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
`

export const styleSheets = StyleSheet.create({
    containerCheck: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0,
        padding: 0,
        margin: 0,
        paddingTop: 10,
        paddingBottom: 10,
    }
})