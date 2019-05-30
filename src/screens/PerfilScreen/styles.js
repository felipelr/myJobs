import styled from 'styled-components'
import { purple } from '../../components/common/util/colors'
import { StyleSheet } from 'react-native'
import actualDimensions from '../../components/common/util/dimensions'

export const Container = styled.ScrollView`
    flex: 1;
`

export const ContainerContent = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    flex: 1;
`
export const Space = styled.View`
    flex:1;
`
export const ContainerTitle = styled.View`
    flex: 0.8;
    background-color: white;
    border-top-right-radius: 20; 
    border-top-left-radius: 20;
    align-items: center;
    justify-content: flex-end;
`

export const Title = styled.Text`
    font-size: 18;
    color: ${purple};
    margin-bottom: 5px;
    font-weight: bold;
`
export const ContainerLista = styled.View`
    flex: 3;
    margin-top: 1;
`
export const ContainerAvatar = styled.View`
    flex: 1;
    position: absolute; 
    right: 0;  
    left: 0;
    align-items: center;
    top: ${actualDimensions.height >= 720 ? 250 : 40};
`
export const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
})