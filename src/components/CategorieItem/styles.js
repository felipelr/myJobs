import {StyleSheet} from 'react-native'
import styled from 'styled-components/native'
import { purple } from '../common/util/colors'

export const styles = StyleSheet.create({
    containerStyle:{
        alignSelf: 'center',
        justifyContent:'space-between'
    } 
})

export const Title = styled.Text`
    color: ${purple};
`

export const ContainerBody = styled.View`
    justify-content:center;
    align-items: center;
    margin-right: 20;
`
 