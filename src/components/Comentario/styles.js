import styled from 'styled-components'
import { purple, lightgray, white } from '../../components/common/util/colors'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const VwContainerComentario = styled.View`
    flex-direction: row;
    width: ${widthPercentageToDP('100%')}; 
    padding: 10px;
    background-color: ${lightgray};
`

export const VwContainerWhite = styled.View`
    flex-direction: row;
    width: 97%; 
    background-color: ${white};
    padding: 10px;
    margin-right: 100px;
    border-radius: 10px;
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