import styled from 'styled-components'
import { black, green, lightgray} from '../../common/util/colors'
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
    font-size: 12px;
    font-family: 'SF-Pro-Text-Regular';
    flex: 1;
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 15px;
`

export const styles = StyleSheet.create({
    containerStyle:{
        alignSelf: 'center',
        justifyContent:'space-between',
    },
    overlayContainerStyle:{
        backgroundColor: lightgray
    }
})