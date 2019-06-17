import { StyleSheet } from 'react-native'
import { purple, lightpurple } from '../../common/util/colors'

export default styles = StyleSheet.create({ 
    searchContainerStyle: {
        backgroundColor: purple,
        width: '100%', 
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        margin:0,
        borderRadius: 20
    },
    searchInputContainerStyle: {
        backgroundColor: lightpurple,
        borderRadius: 20,
        height: 35
    } 
})