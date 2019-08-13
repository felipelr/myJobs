import styled from 'styled-components'
import { black, white } from '../common/util/colors'

export const ViewContainer = styled.View`
    background-color: ${black};
    padding: 5px;
    position: absolute;
    height: 50px;
    width: 100%;
    bottom: 0;
`

export const TextInputWhite = styled.TextInput`
    color: ${white};
    font-size: 14px;
    font-weight: bold;    
`