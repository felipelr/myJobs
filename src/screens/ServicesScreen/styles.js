import styled from 'styled-components/native'
import { StyleSheet } from 'react-native'
import { white, purple, lightpurple } from '../../components/common/util/colors'

export const ContainerList = styled.View`
    flex: 1;
    background-color: ${white};
    margin-top: 2px;
`

export const ContainerSearch = styled.View`
    padding-top: 10px;
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 5px;
`

export default styles = StyleSheet.create({
    searchContainerStyle: {
        backgroundColor: purple,
        width: '100%',
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        margin: 0,
        borderRadius: 20
    },
    searchInputContainerStyle: {
        backgroundColor: lightpurple,
        borderRadius: 20,
        height: 35,
    }
})