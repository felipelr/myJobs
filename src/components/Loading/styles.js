import styled from 'styled-components'
import { white, purple } from '../common/util/colors'

export const ViewContainer = styled.View`
    align-self: center;
    justify-content: center;
    width: 200px;
    padding: 16px;
    border-radius: 10px;
    background-color: ${white};
`

export const ViewContainer2 = styled.View`
    align-self: center;
    justify-content: center;
    width: 200px;
    padding: 16px;
`

export const ViewContainerBack = styled.View`
    width: 100%;
    height: ${props => `${props.height}px`};
    justify-content: space-evenly;
`

export const TextLoading = styled.Text`
    color: ${props => `${props.color}`};
    font-size: 16px;
    text-align: center;
    font-family: 'SF-Pro-Text-Regular';
    font-weight: bold;
`