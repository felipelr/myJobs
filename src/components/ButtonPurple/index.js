import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import { purple } from '../common/util/colors'

const ButtonPurple = (props) => {
    const { onPress, icon } = props
    return (
        <RectButton
            style={styles.button}
            onPress={onPress}
        >
            {icon &&
                <View style={styles.buttonIcon}>
                    <Text>
                        <Icon name={icon} color="#FFF" size={24} />
                    </Text>
                </View>}
            <Text style={styles.buttonText}>{props.children}</Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: purple,
        height: 50,
        flexDirection: 'row',
        borderRadius: 2,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 50,
        width: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
    }
});

export default ButtonPurple;