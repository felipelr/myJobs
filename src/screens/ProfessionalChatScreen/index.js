import React, { useState, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Keyboard, View } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { gray, white, lightpurple } from '../../components/common/util/colors'
import { ViewContainerInfo, TextInfo, ViewContainerChat, ViewContainerNewMessage, TouchIcon } from './styles'
import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'

///////
import { ScrollViewContainerMessages } from './styles'

///////
import { ViewChatDate, TextChatDate } from './styles'

///////
import { ViewChatItem, ViewChatText, TextMessage, ViewArrowLeft, ViewArrowRight } from './styles'

function ChatMessages(props) {
    const { mensagens } = props
    return (
        <ScrollViewContainerMessages>
            {
                mensagens && mensagens.map((item, index) => {
                    if (index === 0) {
                        return (
                            <React.Fragment key={index} >
                                <ChatTextDate mensagem={item} />
                                <ChateItem mensagem={item} />
                            </React.Fragment>
                        )
                    }

                    return <ChateItem key={index} mensagem={item} />
                })
            }
        </ScrollViewContainerMessages>
    )
}

function ChatTextDate(props) {
    const { mensagem } = props
    return (
        <ViewChatDate>
            <TextChatDate>{mensagem.data}</TextChatDate>
        </ViewChatDate>
    )
}

function ChateItem(props) {
    const { mensagem } = props
    return (
        <ViewChatItem justifyContent={mensagem.tipo === 'from' ? 'flex-start' : 'flex-end'}>            
            <ViewChatText
                backColor={mensagem.tipo === 'from' ? '#D3D4FE' : '#EAEAEA'}
                marginRight={mensagem.tipo === 'from' ? 50 : 0}
                marginLeft={mensagem.tipo === 'from' ? 0 : 50}
            >
                <TextMessage>
                    {mensagem.mensagem}
                </TextMessage>
            </ViewChatText>
        </ViewChatItem>
    )
}

export default function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [mensagens, setMensagens] = useState([
        {
            data: '29/05/2019',
            hora: '06:23:57',
            mensagem: 'Olá senhor Miaji, não vou poder ir ao treino hoje, por favor não espere por mim.',
            tipo: 'from'
        },
        {
            data: '29/05/2019',
            hora: '06:28:42',
            mensagem: 'Olá Daniel San, amanhã terá duas vezes mais para chão limpar e cercas para pintar.',
            tipo: 'to'
        }
    ])

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
            <HeaderJobs back title='Finos e Cheirosos' />
            <ViewContainerInfo>
                <TextInfo>Solicitações de Profissionais</TextInfo>
                <TextInfo>Informações do serviço</TextInfo>
            </ViewContainerInfo>
            <ViewContainerChat>
                <ChatMessages mensagens={mensagens} />
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
        </KeyboardAvoidingView>
    )
}

ProfessionalChatScreen.navigationOptions = {
    header: null
}