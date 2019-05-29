import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'

export const ContainerContent = styled.View`
    padding: 5px;
    flex: 1;
    background-color: white;
    margin-top: 5px; 
`
export const ContainerItems = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})` 
    flex-direction: row;
`
 