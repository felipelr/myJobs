import { StyleSheet } from 'react-native'

import { purple } from '../../common/util/colors'

export default styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: purple,
        textAlign: 'center',
        justifyContent: 'space-between',
        fontFamily: 'SF-Pro-Text-Regular'
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})