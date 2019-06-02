import styled from 'styled-components'
import {purple} from '../../components/common/util/colors'

export const VwContainerComentario = styled.View`
    flex-direction: row;
    width: 184;
    height: 60;
    background-color: white;
    margin-bottom: 5;
`

export const TxtTitle = styled.Text`
    font-size: ${props => props.size};
    color: ${props => props.color ? props.color : purple};
    margin-bottom: 5px;
    font-weight: bold;
`