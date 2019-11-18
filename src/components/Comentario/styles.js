import styled from 'styled-components'
import { purple } from '../../components/common/util/colors'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const VwContainerComentario = styled.View`
    flex-direction: row;
    width: ${widthPercentageToDP('50%')}; 
    background-color: white;
    margin-bottom: 5;
    margin-right:7;
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.color ? props.color : purple};
    margin-bottom: 5px;
    margin-left: 7;
    font-weight: bold;
`

export const VwContentComentario = styled.View`
    flex:1;
    justify-content:flex-end;
    margin-left:7
`