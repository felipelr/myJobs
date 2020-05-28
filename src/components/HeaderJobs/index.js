import React from 'react'
import { TouchableOpacity, View, Linking } from 'react-native'
import { Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFont from 'react-native-vector-icons/FontAwesome'

import styles from './styles'
import Title from './Title/index'
import Back from './Back/index'
import Search from './Search/index'
import Chat from './Chat/index'
import Confirm from './Confirm/index'

import { purple, white } from '../common/util/colors'

function NewCall(props) {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Icon name='assignment' size={24} color={white} />
        </TouchableOpacity>
    )
}

function Calls(props) {
    return (
        <TouchableOpacity style={{ paddingRight: 10 }} onPress={props.onPress}>
            <Icon name='playlist-add-check' size={24} color={white} />
        </TouchableOpacity>
    )
}

function ChatView(props) {
    const handlePressWhatsapp = () => {
        const url = `https://wa.me/+55${props.professional.phone}`
        Linking.openURL(url).then(result => {
            console.log('openURL', result)
        }).catch(err => {
            console.error('An error occurred', err)
        });
    }

    return (
        <View style={{ flexDirection: "row" }}>
            <Chat onPress={props.onPress} />
            {props.professional.phone && props.professional.phone.length ? <TouchableOpacity style={{ paddingRight: 10, paddingLeft: 15 }} onPress={() => handlePressWhatsapp()}>
                <IconFont name='whatsapp' size={24} color={white} />
            </TouchableOpacity> : <React.Fragment />}
        </View>
    )
}

export default function HeaderJobs({ title, filter, back, chat, imagem, confirm, newCall, titlePress, calls, ...props }) {
    return (
        <Header
            containerStyle={styles.headerContainerStyle}
            centerComponent={title != null ? <Title imagem={imagem} title={title} onPress={titlePress} /> : filter ? <Search onChangeText={props.onChangeText} /> : null}
            rightComponent={chat ? <ChatView onPress={chat} professional={props.professional} /> : confirm ? <Confirm onPress={confirm} /> : newCall ? <NewCall onPress={newCall} /> : calls ? <Calls onPress={calls} /> : null}
            leftComponent={back && <Back onPress={back} />}
        >
        </Header>
    )
} 
