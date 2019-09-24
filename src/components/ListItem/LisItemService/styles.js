import styled from 'styled-components'
import { black, green } from '../../common/util/colors'
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
    margin-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
`
 
export const styles = StyleSheet.create({
    containerStyle:{
        alignSelf: 'center',
        justifyContent:'space-between'
    },
    overlayContainerStyle:{
        backgroundColor: green
    }
})