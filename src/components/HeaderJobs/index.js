import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from './styles'
import Title from './Title/index'
import Back from './Back/index'
import Search from './Search/index'
import Filter from './Filter/index'
import Chat from './Chat/index'
import Confirm from './Confirm/index'

function NewCall(props) {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Icon name='assignment' size={24} color='white' />
        </TouchableOpacity>
    )
}

export default function HeaderJobs({ title, filter, back, chat, imagem, confirm, newCall, ...props }) {
    return (
        <Header
            containerStyle={styles.headerContainerStyle}
            centerComponent={title != null ? <Title imagem={imagem} title={title} /> : filter ? <Search onChangeText={props.onChangeText} /> : null}
            rightComponent={chat ? <Chat onPress={chat} /> : confirm ? <Confirm onPress={confirm} /> : newCall ? <NewCall onPress={newCall}/> : null}
            leftComponent={back && <Back onPress={back} />}
        >
        </Header>
    )
} 
