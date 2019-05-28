import styled from 'styled-components/native'
import { purple } from '../../components/common/util/colors'

export const Container = styled.ScrollView`
    flex: 1;
`

export const ContainerContent = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    flex: 1;
`

export const SocialMidiaText = styled.Text`
    padding: 4px;
    color: ${purple};
    font-size: 12px;
    text-align: center;
    margin-top: 10px;
`