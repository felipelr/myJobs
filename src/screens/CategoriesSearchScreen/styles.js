import styled from 'styled-components/native'
import { mediumgray, purple, white } from '../../components/common/util/colors'

export const ContainerCategorias = styled.View`
    flex: 1;
    background-color: ${white};
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

export const TextInfoCategoria = styled.Text`
    font-size: 24px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
    color: ${mediumgray};
    padding: 5px 20px 0px 20px;
`

export const ViewInfoCategoria = styled.View`
    align-items: center;
    padding-top: 20px;
`