import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'

export const ContainerItem = styled.View`
    background-color: ${purple};
    border-radius: 2px;
    padding: 8px;
    flex: 1;
    elevation: 1;
`

export const ContentInfo = styled.View`
    flex: 1;
    padding: 8px;
`

export const BodyItem = styled.View`
    flex: 1;
    flex-direction: row;    
`

export const TitleItem = styled.Text`
    font-size: 16px;
    color: ${white};
    font-family: 'SF-Pro-Text-Bold';
    font-weight: bold;
    margin-bottom: 5px;
`
export const DescriptionItem = styled.Text`
    font-size: 11px;
    font-family: 'SF-Pro-Text-Regular';
    color: ${white};
    flex: 1;
`

export const FooterItem = styled.View`
    flex-direction: row;
`