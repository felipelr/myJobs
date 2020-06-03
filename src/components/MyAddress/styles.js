import styled from 'styled-components'
import { white } from '../common/util/colors'

export const ViewContainer = styled.View`
    padding: 0px;
`

export const ScrollViewContainer = styled.ScrollView.attrs({
    contentContainerStyle: { flexGrow: 1 },
    showHorizontalScrollIndicator: false,
    padding: 5, 
    paddingBottom: 40, 
    backgroundColor: 'white'
})``

export const ContainerLista = styled.View`
    background-color: ${white};
    flex: 1;
`

export const ViewContainerButton = styled.View`
    width: 150px;
    align-self: center;
    padding-bottom: 16px;
`