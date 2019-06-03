import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { gray, white, lightpurple } from '../../components/common/util/colors'
import { ViewContainerInfo, TextInfo, ViewContainerChat, ViewContainerNewMessage, TextInputChat, TouchIcon } from './styles'
import Container from '../../components/Container/index'
import Footer from '../../components/Footer/index'

export default function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)

    useEffect(() => {
        this.kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        this.knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        return () => {
            this.kbShow.remove()
            this.kbShow.remove()
        }
    }, [])

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <ViewContainerInfo>
                <TextInfo>Solicitações de Profissionais</TextInfo>
                <TextInfo>Informações do serviço</TextInfo>
            </ViewContainerInfo>
            <ViewContainerChat>

            </ViewContainerChat>
            <ViewContainerNewMessage>
                <TouchIcon>
                    <Icon name='tag-faces' size={25} color={gray} />
                </TouchIcon>
                <Input 
                    placeholder='Digite sua mensagem'
                    placeholderTextColor={white}
                    containerStyle={{ flex: 1 }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    inputStyle={{ backgroundColor: lightpurple, color: white, paddingTop: 0, paddingBottom: 0, borderRadius: 2 }} />
                <TouchIcon>
                    <Icon name='send' size={25} color={gray} />
                </TouchIcon>
            </ViewContainerNewMessage>
            <Footer />
        </KeyboardAvoidingView>
    )
}

ProfessionalChatScreen.navigationOptions = {
    header: null
}