import styled from 'styled-components'
import { white, purple, black, lightgray } from '../common/util/colors'

export const ViewContainer = styled.View`
    padding: 8px;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})``