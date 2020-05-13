import { StyleSheet } from 'react-native'

import { purple, white } from '../../common/util/colors'

export default styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: white,
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