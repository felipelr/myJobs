import styled from 'styled-components/native'
import { lightgray, purple } from '../../components/common/util/colors'

export const ContainerCategorias = styled.View`
    flex: 1;
    background-color: ${lightgray};
    align-content: flex-start;
    padding: 0;
    margin: 0;
`

export const TextLoading = styled.Text`
    color: ${purple};
    font-size: 16px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`