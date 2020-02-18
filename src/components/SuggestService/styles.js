import styled from 'styled-components'
import { white, purple, black, lightgray } from '../common/util/colors'

export const ViewContainer = styled.View`
    padding: 8px;
`

export const TxtTitle = styled.Text`
    font-size: 12px;
    color: ${black};
    font-family: 'SF-Pro-Text-Regular';
    margin: 8px 0px 4px 0px;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})``