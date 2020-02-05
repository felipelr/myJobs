import styled from 'styled-components'
import { lightgray, white, mediumgray } from '../common/util/colors'
import { widthPercentageToDP } from '../../components/common/util/dimensions'

export const VwContainerServices = styled.ScrollView.attrs({
    horizontal: true,
    contentContainerStyle: { paddingLeft: 2, paddingRight: 2 },
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})` 
    flex-direction: row;
    margin-bottom: 5;
`

export const VwContainerCard = styled.View`
    elevation: 1;
    width: ${widthPercentageToDP('60%')}; 
    margin-right:5;
    border-radius: 10;
    border-width: 1;
    border-color: ${lightgray};
    background-color: ${white};
`

export const VwTitleCard = styled.View`
    flex: 2.5;
    border-top-left-radius: 10;
    justify-content: center;  
    border-top-right-radius: 10;
    background-color: ${lightgray};
`

export const VwSubTitle = styled.View`
    flex:5;
    padding-right: 10px;
`

export const VwRodapeContent = styled.View`
    margin-left: 5;
    margin-right: 5;
    flex-direction: row;
    justify-content: space-between;
`

export const VwEmptyTitle = styled.View`
    width: 100px;
    height: 8px;
    margin: 6px 0px 6px 6px;
    background-color: ${mediumgray};
    border-radius: 5px;
`

export const VwEmpty = styled.View`
    height: 8px;
    margin: 6px 6px 6px 6px;
    background-color: ${mediumgray};
    border-radius: 5px;
`

export const VwEmpty2 = styled.View`
    height: 8px;
    margin: 2px 30px 0px 6px;
    background-color: ${mediumgray};
    border-radius: 5px;
`