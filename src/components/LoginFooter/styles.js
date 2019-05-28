import styled from 'styled-components/native'
import { purple, lightgray } from '../../components/common/util/colors'

export const ContainerFooter = styled.View`
    background-color: ${lightgray};
    align-content: flex-end;
    width: 100%;
    padding: 8px;
`

export const CopyRightText = styled.Text`
    color: ${purple};
    font-size: 10px;
    text-align: center;
`