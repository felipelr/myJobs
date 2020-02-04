import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, black } from '../common/util/colors'

export const ScrollViewContainerForm = styled.ScrollView.attrs({
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``

export const TextSignUpTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 5px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerGotoLogin = styled.View`
    padding-top: 25px;
    padding-left: 20px;
    margin-bottom: 16px;
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

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
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