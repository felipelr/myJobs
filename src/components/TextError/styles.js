import styled from 'styled-components/native'
import { red, lightred } from '../../components/common/util/colors'

export const TextErrorMessage = styled.Text`
    color: ${red};
    background-color: ${lightred};
    font-family: 'SF-Pro-Text-Regular';
    font-size: 12px;
    text-align: center;
    font-weight: bold;
    padding: 8px;
`