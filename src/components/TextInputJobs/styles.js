import styled from 'styled-components'
import { black, red } from '../common/util/colors'

export const TextInputCustom = styled.TextInput`
    font-size: 14px;
    color: ${black};
    padding-bottom: 16px;
    font-family: 'SF-Pro-Text-Regular';
`
export const ContainerTextInput = styled.View`
    border-bottom-width: 0px;
`
export const ViewRed = styled.View`
    border-bottom-color: ${red};
    border-bottom-width: 1px;
    margin-bottom: 25px;
`
export const ViewBlack = styled.View`
    border-bottom-color: ${black};
    border-bottom-width: 1px;
    margin-bottom: 25px;
`