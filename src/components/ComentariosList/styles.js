import styled from 'styled-components'
import { mediumgray } from '../common/util/colors'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const SvwContainerComentarios = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})` 
    flex-direction: row;
    margin-bottom: 5;
`

export const VwEmpty = styled.View`
    height: 6;
    margin: 6px 0px 10px 6px; 
    background-color: ${mediumgray};
    border-radius: 5px;
`

export const VwEmpty2 = styled.View`
    height: 6;
    margin: 0px 30px 3px 6px;
    background-color: ${mediumgray};
    border-radius: 5px;
`
export const VwContainerComentario = styled.View`
    flex-direction: row;
    width: ${widthPercentageToDP('50%')}; 
    background-color: white;
    margin-bottom: 5px;
    margin-right: 7px;
`