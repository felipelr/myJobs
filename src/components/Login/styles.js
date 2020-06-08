import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { purple, black } from '../../components/common/util/colors'

export const LoginTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 6px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerFields = styled.View`
    justify-content: space-between;
`

export const LoginButtonContainer = styled.View`
    width: 150px;
    align-self: center;
`

export const ContainerNewUser = styled.View`
    padding-top: 16px;
    padding-bottom: 16px;
    flex-direction: row;
`

export const NewUserText = styled.Text`
    color: ${black};
    font-size: 12px;
    flex: 1;
    text-align: right;
    font-family: 'SF-Pro-Text-Regular';
`

export const NewUserButton = styled.TouchableOpacity`
    flex: 1;
    padding-left: 2px;
`

export const NewUserButtonText = styled.Text`
    color: ${purple};
    font-size: 12px;
    text-align: left;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerRow = styled.View`
    flex-direction: row;
    justify-content: space-around;
`

export const styleSheets = StyleSheet.create({
    containerCheck: {
        backgroundColor: '#FFFFFF',
        borderWidth: 0
    }
})