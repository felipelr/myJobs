import styled from 'styled-components'
import {  lightgray, white } from '../../components/common/util/colors'

export const ContainerListItem = styled.TouchableOpacity`
    background-color: ${white};
    padding: 5px;
    border-bottom-color: ${lightgray};
    border-bottom-width: 1px;
    flex-direction: row;
`

export const LeftContainerItem = styled.View`
    width: 50px;
    justify-content: space-evenly;
`

export const RightContainerItem = styled.View`
    width: 30px;
    justify-content: space-evenly;
`

export const CenterContainerItem = styled.View`
    flex: 1;
    flex-direction: column;
`