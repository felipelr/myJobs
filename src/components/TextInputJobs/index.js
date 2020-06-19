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

export default TextInputJobs = React.forwardRef(({ invalidValue, name, style, onChangeText, secureTextEntry, ...props }, ref) => {
    const [showPwd, setShowPwd] = useState(false)

    return (
        <ContainerTextInput style={style}>
            <ContainerRow>
                <TextInputCustom
                    {...props}
                    ref={ref}
                    onChangeText={(text) => onChangeText(name, text)}
                    secureTextEntry={secureTextEntry && !showPwd} />
                {(secureTextEntry && !showPwd) && <ContainerIcon><Icon name='eye' size={20} onPress={() => setShowPwd(!showPwd)} /></ContainerIcon>}
                {(secureTextEntry && showPwd) && <ContainerIcon><Icon name='eye-slash' size={20} onPress={() => setShowPwd(!showPwd)} /></ContainerIcon>}
            </ContainerRow>
            {invalidValue && <ViewRed />}
            {!invalidValue && <ViewBlack />}
        </ContainerTextInput>
    )
})