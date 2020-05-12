import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { purple, white } from '../../components/common/util/colors'

export const styles = StyleSheet.create({
    elevation: 1
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
    background-color: ${white};
    padding: 4px;
    border-bottom-width: 3px;
    border-bottom-color: ${props => `${props.borderColor}`};
`

export const TxtTab = styled.Text`
    color: ${purple};
    font-size: 14;
    align-self: center;
`

export const ViewListItem = styled.View`
    flex-direction: row;
    justify-content: space-between;
`