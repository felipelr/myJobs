import styled from 'styled-components/native'
import { purple, white } from '../common/util/colors'

export const ContainerContent = styled.View`
    padding: 5px;
    flex: 1;
    background-color: ${white};
    margin-top: 2px;
`
export const Title = styled.Text`
    font-size: 12px;
    color: ${purple};
    font-family: 'SF-Pro-Text-Bold';
    margin-bottom: 5px;
    font-weight: bold;
`

export const ContainerItems = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``