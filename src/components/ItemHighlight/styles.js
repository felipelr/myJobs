import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'

export const ContainerItem = styled.View`
    background-color: ${purple};
    border-radius: 2px;
    padding: 5px;
    flex: 1;
`

export const BodyItem = styled.View`
    flex: 1;
    flex-direction: row;    
`

export const TitleItem = styled.Text`
    font-size: 18px;
    color: ${white};
    font-weight: bolder;
`
export const DescriptionItem = styled.Text`
    font-size: 11px;
`

export const FooterItem = styled.View`
    flex-direction: row;
`