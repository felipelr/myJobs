import styled from 'styled-components'
import { purple, white, lightgray } from '../../components/common/util/colors'
import { StyleSheet } from 'react-native'
import { heightPercentageToDP } from '../../components/common/util/dimensions'

export const ScrollViewContainer = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    contentContainerStyle: { flexGrow: 1 },
})``

export const ContainerContent = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${lightgray};
    flex: 1;
`
export const Space = styled.View`
    height:${heightPercentageToDP('14%')};
`
export const ContainerTitle = styled.View`
    padding-top: ${heightPercentageToDP('10%')};
    background-color: white;
    border-top-right-radius: 20; 
    border-top-left-radius: 20;
    align-items: center;
    justify-content: flex-end;
    border-bottom-width: 1;
    border-bottom-color: white;
`

export const Title = styled.Text`
    font-size: 24;
    color: ${purple};
    margin-bottom: 10px;
    font-weight: bold;
`
export const ContainerLista = styled.View`
    background-color: ${white};
`
export const ContainerAvatar = styled.View`
    position: absolute; 
    right: 0;  
    left: 0;
    align-items: center;
    top: ${heightPercentageToDP('3%')};
`

export const ViewSlider = styled.TouchableOpacity`
    width: 200;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
`

export const TxtSlider = styled.Text`
    font-size: 14;
    color: ${props => `${props.color}`};
    margin-bottom: 10px;
    margin-top: 6px;
`

export const TouchHabilitarProfessional = styled.TouchableOpacity`
    padding: 5px;
`

export const styles = StyleSheet.create({
    elevation: 2
})