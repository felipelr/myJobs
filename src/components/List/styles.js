import styled from 'styled-components'
import { purple, mediumgray } from '../common/util/colors'

export const TitleList = styled.Text`
    color: ${purple};
    font-weight: bold;
    font-size: 14px;
    font-family: 'SF-Pro-Text-Bold';
    padding-left: 5px;
    padding-top: 5px;
`
export const ContainerList = styled.ScrollView.attrs({
    horizontal: false,
    showHorizontalScrollIndicator: false
})``

export const ViewTitleEmpty = styled.View`
    height: 10;
    background-color: ${mediumgray};
    width: 200;
    margin-left: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
`
export const ViewSubTitleEmpty = styled.View`
    height: 10;
    background-color: ${mediumgray};
    width: 120;
    margin-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
`