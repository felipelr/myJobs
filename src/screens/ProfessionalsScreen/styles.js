import styled from 'styled-components/native'
import { white, purple } from '../../components/common/util/colors'

export const ContainerProfessionals = styled.View`
    flex: 1;
    background-color: lightgray;
`

export const ContainerList = styled.View`
    flex: 3;
    background-color: ${white};
    margin-top: 2px;
`

export const TextLoading = styled.Text`
    color: ${purple};
    font-size: 16px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`