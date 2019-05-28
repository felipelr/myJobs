import styled from 'styled-components/native'
import { purple, black } from '../../components/common/util/colors'

export const Card = styled.View`
    align-self: center;
    background-color: ${props => `${props.backColor}`};
    padding: 16px;
    border-radius: 10px;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    elevation: 1;
`

export const LoginTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 25px;
    font-family: 'SF-Pro-Text-Regular';
`

export const LoginTextInput = styled.TextInput`
    font-size: 14px;
    color: #000000;
    padding-bottom: 16px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ContainerTextInput = styled.View`
    border-bottom-color: ${black};
    border-bottom-width: 1px;
    margin-bottom: 25px;
`

export const LoginButtonContainer = styled.View`
    width: 100px;
    align-self: center;
`

export const ContainerNewUser = styled.View`
    padding-top: 25px;
    flex: 1;
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