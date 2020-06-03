import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
    ContainerTextInput,
    TextInputCustom,
    ViewRed,
    ViewBlack,
    ContainerRow,
    ContainerIcon,
} from './styles'

export default function TextInputJobs({ invalidValue, name, style, onChangeText, secureTextEntry, ...props }) {
    const [showPwd, setShowPwd] = useState(false)

    return (
        <ContainerTextInput style={style}>
            <ContainerRow>
                <TextInputCustom onChangeText={(text) => onChangeText(name, text)} {...props} secureTextEntry={secureTextEntry && !showPwd}/>
                {(secureTextEntry && !showPwd) && <ContainerIcon><Icon name='eye' size={20} onPress={() => setShowPwd(!showPwd)} /></ContainerIcon>}
                {(secureTextEntry && showPwd) && <ContainerIcon><Icon name='eye-slash' size={20} onPress={() => setShowPwd(!showPwd)} /></ContainerIcon>}
            </ContainerRow>
            {invalidValue && <ViewRed />}
            {!invalidValue && <ViewBlack />}
        </ContainerTextInput>
    )
}