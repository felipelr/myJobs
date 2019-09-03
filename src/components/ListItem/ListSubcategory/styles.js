import styled from 'styled-components'
import { black, purple } from '../../common/util/colors'
import {StyleSheet} from 'react-native'

export const TitleSubcategory = styled.Text`
    color: ${black};
    font-size: 14px;
    font-family: 'SF-Pro-Text-Bold';
    flex: 1;
    padding-left: 10px;
    font-weight: bold;
`

export const InfoSubcategory = styled.Text`
    color: ${black};
    font-size: 10px;
    font-family: 'SF-Pro-Text-Regular';
    flex: 1;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 15px;
`

export const styles = StyleSheet.create({
    containerStyle:{
        alignSelf: 'center',
        justifyContent:'space-between'
    },
    overlayContainerStyle:{
        backgroundColor: purple
    }
})