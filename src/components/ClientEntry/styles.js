import styled from 'styled-components'
import { purple } from '../../components/common/util/colors'

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2, flexGrow: 1 },
    showHorizontalScrollIndicator: false
})``

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
`