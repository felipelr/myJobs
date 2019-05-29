import styled from 'styled-components'

export const ContainerCard = styled.View`
    align-self: center;
    background-color: ${props => `${props.backColor}`};
    padding: 16px;
    border-radius: 10px;
    width: ${props => `${props.width}px`};
    height: ${props => `${props.height}px`};
    opacity: ${props => `${props.opacity}`};
    elevation: 1;
`