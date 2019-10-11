import styled from 'styled-components'
import { purple, white } from '../common/util/colors'

export const ViewContainer = styled.View`
    padding: 8px;
`

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showHorizontalScrollIndicator: false
})``

export const ContainerLista = styled.View`
    background-color: ${white};
    flex: 1;
`