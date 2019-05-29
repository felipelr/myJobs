import styled from 'styled-components/native'
import { purple, black } from '../../components/common/util/colors'

export const LoginTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 25px;
    font-family: 'SF-Pro-Text-Regular';
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