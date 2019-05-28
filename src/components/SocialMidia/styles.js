import styled from 'styled-components/native'
import { purple } from '../../components/common/util/colors'

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