import { StyleSheet } from 'react-native'
import { lightgray } from '../../common/util/colors'

export default styles = StyleSheet.create({ 
    searchContainerStyle: {
        backgroundColor: lightgray,
        width: '100%', 
        borderTopWidth: 0,
        borderBottomWidth: 0,
        padding: 0,
        margin:0,
        borderRadius: 20
    },
    searchInputContainerStyle: {
        backgroundColor: lightgray,
        borderRadius: 20,
        height: 35
    } 
})