import styled from 'styled-components'
import { white, purple, black, lightgray } from '../../components/common/util/colors'

export const ViewContainerInfo = styled.View`
    padding: 5px;
    background-color: ${white};
    margin-bottom: 2px;
`

export const TextInfo = styled.Text`
    font-family: 'SF-Pro-Text-Bold';
    font-size: 14px;
    font-weight: bold;
    color: ${purple};
    margin: 2px;
`

export const ViewContainerChat = styled.View`
    flex: 1;
    padding: 5px;
    background-color: ${white};
`

export const ViewContainerNewMessage = styled.View`
    padding: 5px;
    background-color: ${white};
    margin-top: 2px;
    flex-direction: row;
`

export const TouchIcon = styled.TouchableOpacity`
    padding: 5px;
`

export const ViewLoading = styled.View`
    height: 100%;
    width: 100%;
    position: absolute;
    background-color: #ffffff;
`

export const TxtAddressTitle = styled.Text`
    font-size: 14px;
    font-weight: bold;
    color: ${black};    
    align-self: center;
    padding-left: 10px;
`

export const TxtAddress = styled.Text`
    font-size: 12px;
    color: ${black};
    align-self: center;
    padding-left: 10px;
`

export const TouchAddress = styled.TouchableOpacity`
    padding: 20px 0px 20px 0px;
    border-top-color: ${lightgray};
    border-top-width: 1px;
    flex-direction: row;
    width: 90%;
`

export const ViewTitleAddress = styled.View`
    flex-direction: row;    
    margin-bottom: 15px;
`