import styled from 'styled-components'

export const ContainerCard = styled.View`
    align-self: center;
    background-color: ${props => `${props.backColor}`};
    padding: ${props => `${props.paddingCard}px`};
    border-radius: ${props => `${props.borderRadius}px`};
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    opacity: ${props => `${props.opacity}`};
    elevation: 1;
`