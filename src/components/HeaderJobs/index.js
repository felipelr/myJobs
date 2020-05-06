import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './styles'
import Title from './Title/index'
import Back from './Back/index'
import Search from './Search/index'
import Chat from './Chat/index'
import Confirm from './Confirm/index'

import { purple } from '../common/util/colors'

function NewCall(props) {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Icon name='assignment' size={24} color={purple} />
        </TouchableOpacity>
    )
}

function Calls(props) {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Icon name='playlist-add-check' size={24} color={purple} />
        </TouchableOpacity>
    )
}

export default function HeaderJobs({ title, filter, back, chat, imagem, confirm, newCall, titlePress, calls, ...props }) {
    return (
        <Header
            containerStyle={styles.headerContainerStyle}
            centerComponent={title != null ? <Title imagem={imagem} title={title} onPress={titlePress} /> : filter ? <Search onChangeText={props.onChangeText} /> : null}
            rightComponent={chat ? <Chat onPress={chat} /> : confirm ? <Confirm onPress={confirm} /> : newCall ? <NewCall onPress={newCall} /> : calls ? <Calls onPress={calls} /> : null}
            leftComponent={back && <Back onPress={back} />}
        >
        </Header>
    )
} 
