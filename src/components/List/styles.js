import styled from 'styled-components'
import { purple } from '../common/util/colors'

export const TitleList = styled.Text`
    color: ${purple};
    font-weight: bold;
    font-size: 12px;
    font-family: 'SF-Pro-Text-Bold';
    padding-left: 5px;
    padding-top: 5px;
`
export const ContainerList = styled.ScrollView.attrs({
    horizontal: false,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showHorizontalScrollIndicator: false
})``