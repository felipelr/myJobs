import styled from 'styled-components'
import { widthPercentageToDP, heightPercentageToDP } from '../common/util/dimensions'

export const ContainerCard = styled.View`
    align-self: center;
    background-color: ${props => `${props.backColor}`};
    padding: ${props => `${props.paddingCard}px`};
    border-radius: ${props => `${props.borderRadius}px`};
    width: ${props => widthPercentageToDP(props.width + '%')};
    height: ${props => heightPercentageToDP(props.height + '%')};
    opacity: ${props => `${props.opacity}`};
    border-width: ${props => `${props.borderWidth}`};
    border-top-color: ${props => `${props.boderColor}`};
    border-bottom-color: ${props => `${props.boderColor}`};
    border-left-color: ${props => `${props.boderColor}`};
    border-right-color: ${props => `${props.boderColor}`};
    elevation: 2;
`