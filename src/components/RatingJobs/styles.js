import styled from 'styled-components'

export const ContainerRating = styled.View`
    flex-direction: row;
`

export const RatingText = styled.Text`
    color: ${props => `${props.color}`};
    font-size: 10px;
    font-family: 'SF-Pro-Text-Regular';
    padding-left: 5px;
    padding-top: 2px;
`