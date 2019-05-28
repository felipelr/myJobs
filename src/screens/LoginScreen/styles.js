import styled from 'styled-components/native'
import { purple, lightgray, black } from '../../components/common/util/styles'

export const Container = styled.ScrollView`
    flex: 1;
`

export const ContainerPurple = styled.View`
    background-color: ${purple};
    flex: 1;
`

export const ContainerGray = styled.View`
    background-color: ${lightgray};
    flex: 2;
`

export const ContainerContent = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    flex: 1;
`

export const ContainerLogin = styled.View`
    align-self: center;
    background-color: #FFFFFF;
    padding: 16px;
    border-radius: 10px;
    width: 300px;
    height: 330px;
    elevation: 1;
`

export const LoginTitle = styled.Text`
    font-size: 24px;
    color: ${purple};
    text-align: center;
    padding-bottom: 25px;
`

export const LoginTextInput = styled.TextInput`
    font-size: 14px;
    color: #000000;
    padding-bottom: 16px;
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

export const ContentNewUser = styled.View`
    padding-top: 25px;
    flex: 1;
    flex-direction: row;
`

export const NewUserText = styled.Text`
    color: ${black};
    font-size: 12px;
    flex: 1;
    text-align: right;
`

export const NewUserButton = styled.TouchableOpacity`
    flex: 1;
    padding-left: 2px;
`

export const NewUserButtonText = styled.Text`
    color: ${purple};
    font-size: 12px;
    text-align: left;
`

export const ContainerSocialMidia = styled.View`
    flex-direction: row;
    justify-content: center;
`

export const SocialMidiaText = styled.Text`
    padding: 4px;
    color: ${purple};
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
`

export const SocialMidiaButton = styled.TouchableOpacity`
    padding: 4px;
    margin-right: 16px;
`

export const ContainerFooter = styled.View`
    background-color: ${lightgray};
    align-content: flex-end;
    width: 100%;
    padding: 8px;
`

export const CopyRightText = styled.Text`
    color: ${purple};
    font-size: 10px;
    text-align: center;
    
`