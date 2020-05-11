import styled from 'styled-components'
import { purple, lightgray, gray, mediumgray } from '../../components/common/util/colors'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const VwContainerComentario = styled.View`
    flex-direction: row;
    width: ${widthPercentageToDP('90%')}; 
    background-color: white;
    margin-bottom: 20;
    margin-right: 7;
    padding-bottom: 10;
    padding-top: 5;
    padding-left: 10;
    border-bottom-color: ${lightgray};
    border-left-color: ${lightgray};
    border-bottom-width: 1;
    border-left-width: 1;
    border-bottom-left-radius: 10;
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.color ? props.color : purple};
    margin-top: 5;
    margin-bottom: 5;
    margin-left: 7;
    font-weight: bold;
`

export const VwContentComentario = styled.View`
    flex: 1;
    justify-content: flex-end;
    margin-left: 7
`