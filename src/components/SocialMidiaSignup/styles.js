import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, white } from '../common/util/colors'

export const ScrollViewContainerForm = styled.ScrollView.attrs({
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``

export const ViewContainer = styled.View`
    padding: 5px;
`

export const TextSignUpTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 25px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const ButtonPurple = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${purple};
    border-radius: 5px;
    width: 150px;
`
export const TextButtonPurple = styled.Text`
    color: ${white};
    font-family: 'SF-Pro-Text-Regular';
    font-size: 16px;
    text-align: center;
    font-weight: bold;
`
export const styleSheets = StyleSheet.create({
    containerCheck: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0
    }
})