import styled from 'styled-components/native'
import { purple, black, white } from '../../components/common/util/colors'

export const LoginTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 16px;
    font-family: 'SF-Pro-Text-Regular';
`

export const ViewContainerFields = styled.View`
    justify-content: space-between;
    margin-top: 8px;
`

export const LoginButtonContainer = styled.View`
    width: 100px;
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

export const ButtonPurple = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${purple};
    border-radius: 5px;
    justify-content: space-evenly;
`
export const TextButtonPurple = styled.Text`
    color: ${white};
    font-family: 'SF-Pro-Text-Regular';
    font-size: 16px;
    text-align: center;
    font-weight: bold;
`