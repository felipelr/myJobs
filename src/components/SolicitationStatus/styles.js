import styled from 'styled-components'
import { white } from '../common/util/colors'

export const SolicitationStatusContainer = styled.View`
    flex-direction: row;
    justify-content: space-evenly;
    padding-top: 5px;
`
export const CardStatusContainer = styled.View`
    flex: 1;
    background-color: ${white};
    align-items: center;
    justify-content: space-evenly;
`
export const CardStatusText = styled.Text`
    font-family: 'SF-Pro-Text-Bold';
    font-size: 14px;
    font-weight: bold;
    color: ${props => `${props.textColor}`};
`