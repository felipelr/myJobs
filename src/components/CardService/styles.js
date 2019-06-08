import styled from 'styled-components'
import { purple, lightgray, white, black } from '../common/util/colors' 
import actualDimensions, {widthPercentageToDP, heightPercentageToDP }  from '../../components/common/util/dimensions'


export const VwContainerCard = styled.View`
    elevation: 1;
    width: ${widthPercentageToDP('60%')}; 
    margin-right:5;
    border-radius: 10;
    border-width: 1;
    border-color: ${lightgray};
`

export const VwTitleCard = styled.View`
    flex: 2.5;
    border-top-left-radius: 10;
    justify-content: center;  
    border-top-right-radius: 10;
    background-color: ${props => props.select ? purple : lightgray};
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.select ? white : props.texto ? black : purple};
    font-weight: ${props => props.bold ? 'bold' : 'normal'};
    margin-left:5;
`

export const VwSubTitle = styled.View`
    flex: 5;
`

export const VwRodape = styled.View`
    flex: 2; 
    justify-content: center;
    border-bottom-left-radius: 10;
    border-bottom-right-radius: 10; 
`

export const VwRodapeContent = styled.View`
    margin-left: 5;
    margin-right: 5;
    flex-direction: row;
    justify-content: space-between;
`