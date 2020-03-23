import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, white, black, green } from '../../components/common/util/colors'

export const styles = StyleSheet.create({
    elevation: 2
})

export const ScrollViewContainer = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
})``

export const ViewContainer = styled.View`
    background-color: ${white};
    flex: 1;
`

export const ViewTabControl = styled.View`
    flex-direction: row;
    height: 35px;
`

export const TouchTab = styled.TouchableOpacity`
    flex: 1;
    background-color: ${purple};
    padding: 4px;
    border-bottom-width: 3px;
    border-bottom-color: ${props => `${props.borderColor}`};
`

export const TxtTab = styled.Text`
    color: ${white};
    font-size: 14;
    align-self: center;
`

export const ViewCallDate = styled.View`
    flex-direction: row;
`

export const TxtCallDate = styled.Text`
    color: ${black};
    font-size: 12;
    align-self: center;
`

export const TxtCallService = styled.Text`
    color: ${white};
    font-size: 10;
    background-color: ${green};
    padding: 2px 4px 2px 4px;
    margin-right: 10px;
    border-radius: 2px;
`

export const TxtCallProfessional = styled.Text`
    color: ${black};
    font-size: 14;
`