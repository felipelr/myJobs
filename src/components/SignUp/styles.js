import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, black, white } from '../common/util/colors'

export const ScrollViewContainerForm = styled.ScrollView.attrs({
    horizontal: false,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``

export const TextSignUpTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 25px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerGotoLogin = styled.View`
    padding-top: 25px;
    padding-left: 20px;
    width: 100%;
    flex-direction: row;
`

export const TextGotoLogin = styled.Text`
    color: ${black};
    font-size: 12px;
    flex: 1;
    text-align: right;
    font-family: 'SF-Pro-Text-Regular';
`

export const ButtonGotoLogin = styled.TouchableOpacity`
    flex: 1;
    padding-left: 2px;
`

export const TextGotoLoginButton = styled.Text`
    color: ${purple};
    font-size: 12px;
    text-align: left;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewFixedContainer = styled.View`
    height: ${props => `${props.height}px`};
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

export const PickerGenre = styled.Picker`
    font-size: 14px;
    color: ${black};
    padding-bottom: 16px;
    font-family: 'SF-Pro-Text-Regular';
`

export const styleSheets = StyleSheet.create({
    containerCheck: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0
    }
})