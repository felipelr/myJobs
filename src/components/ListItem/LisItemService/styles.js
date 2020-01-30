import styled from 'styled-components'
import { black, green, gold, lightgray } from '../../common/util/colors'
import {StyleSheet} from 'react-native'

export const TitleService = styled.Text`
    color: ${black};
    font-size: 14px;
    font-family: 'SF-Pro-Text-Bold'; 
    margin-left: 10px;
    flex: 1;
    font-weight:bold;
`

export const InfoService = styled.Text`
    color: ${black};
    font-size: 10px;
    font-family: 'SF-Pro-Text-Regular';
    flex: 1;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 15px;
`

export const Services = styled.Text`
    font-size: 10px;
    font-family: 'SF-Pro-Text-Bold'; 
    color: ${gold}; 
    margin-left: 10px;
    flex-direction:row;
    font-weight:bold;
`
 
export const styles = StyleSheet.create({
    containerStyle:{
        alignSelf: 'center',
        justifyContent:'space-between'
    },
    overlayContainerStyle:{
        backgroundColor: lightgray
    }
})