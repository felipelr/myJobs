import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler, Keyboard, TextInput } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'

import { gray, white, lightpurple } from '../../components/common/util/colors'
import { ViewContainerInfo, TextInfo, ViewContainerChat, ViewContainerNewMessage, TouchIcon } from './styles'
import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import useGet from '../../services/restServices'

import ActionCreators from '../../store/actionCreators'

///////ChatMessages
import { ScrollViewContainerMessages } from './styles'

///////ChatTextDate
import { ViewChatDate, TextChatDate } from './styles'

///////ChatItem
import { ViewChatItem, ViewChatText, TextMessage } from './styles'

function ChatMessages(props) {
    const { messages } = props
    const { userType } = props
    return (
        <ScrollViewContainerMessages>
            {
                messages && messages.map((item, index) => {
                    if (index === 0) {
                        return (
                            <React.Fragment key={index} >
                                <ChatTextDate mensagem={item} />
                                <ChateItem mensagem={item} userType={userType} />
                            </React.Fragment>
                        )
                    }
                    else {
                        const previousItem = messages[index - 1]
                        if (previousItem.date != item.date) {
                            return (
                                <React.Fragment key={index} >
                                    <ChatTextDate mensagem={item} />
                                    <ChateItem mensagem={item} userType={userType} />
                                </React.Fragment>
                            )
                        }
                        else {
                            return <ChateItem key={index} mensagem={item} userType={userType} />
                        }
                    }
                })
            }
        </ScrollViewContainerMessages>
    )
}

function ChatTextDate(props) {
    const { mensagem } = props
    return (
        <ViewChatDate>
            <TextChatDate>{mensagem.date}</TextChatDate>
        </ViewChatDate>
    )
}

function ChateItem(props) {
    const { mensagem } = props
    const { userType } = props
    return (
        <ViewChatItem justifyContent={mensagem.msg_from === userType ? 'flex-start' : 'flex-end'}>
            <ViewChatText
                backColor={mensagem.msg_from === userType ? '#D3D4FE' : '#EAEAEA'}
                marginRight={mensagem.msg_from === userType ? 50 : 0}
                marginLeft={mensagem.msg_from === userType ? 0 : 50}
            >
                <TextMessage>
                    {mensagem.message}
                </TextMessage>
            </ViewChatText>
        </ViewChatItem>
    )
}

function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [mensagens, setMensagens] = useState([])

    const inputMsgRef = useRef()

    const getMessages = useGet('', props.token)

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)
        const kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        const knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        carregarMensagens()

        return () => {
            backHandler.remove()
            kbShow.remove()
            knHide.remove()
        }
    }, [])

    const carregarMensagens = async () => {
        try {
            const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
            const messagesStr = await AsyncStorage.getItem(storageName)
            let _last = 0;
            if (messagesStr != null) {
                const messages_ = JSON.parse(messagesStr)
                if (messages_ && messages_.length) {
                    setMensagens(messages_)
                    if (messages_.length > 0) {
                        const lastIndex = messages_.length - 1;
                        _last = messages_[lastIndex].id
                    }
                }
            }

            getMessages.refetch(`/chatMessages/messages.json?client_id=${props.user.id}&professional_id=${props.professionalSelected.id}&last_id=${_last}`)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        if (getMessages.data && getMessages.data.chatMessages) {
            console.log('newMessages => ', getMessages.data.chatMessages)
            setMensagens(mensagens.concat(getMessages.data.chatMessages))

            if (getMessages.data.chatMessages.length > 0) {
                try {
                    const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                    AsyncStorage.getItem(storageName, (err, result) => {
                        if (result !== null) {
                            const arrayMessages = JSON.parse(result).concat(getMessages.data.chatMessages)
                            AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                        } else {
                            AsyncStorage.setItem(storageName, JSON.stringify(getMessages.data.chatMessages))
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }, [getMessages.data]);

    useEffect(() => {
        if (props.sendedMessage && props.sendedMessage.id) {
            console.log('props.sendedMessage => ', props.receivedMessage)
            try {
                const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                AsyncStorage.getItem(storageName, (err, result) => {
                    const newMessage = [props.receivedMessage]
                    if (result !== null) {
                        const arrayMessages = JSON.parse(result).concat(newMessage)
                        AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                    } else {
                        AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
                    }
                })
            } catch (e) {
                console.log(e)
            }
        }
    }, [props.sendedMessage]);

    useEffect(() => {
        if (props.receivedMessage && props.receivedMessage.id) {
            console.log('props.receivedMessage => ', props.receivedMessage)
            setMensagens([...mensagens, {
                date: Moment().format('DD/MM/YYYY'),
                time: Moment().format('HH:mm:ss'),
                ...props.receivedMessage
            }])
        }
    }, [props.receivedMessage]);

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const handleSendPress = () => {
        const newMessage = inputMsgRef.current.input._lastNativeText
        if (newMessage.length > 0) {
            if (props.userType == 'client') {
                const form = {
                    client_id: props.user.id,
                    professional_id: props.professionalSelected.id,
                    message: newMessage,
                    date_time: Moment().format('YYYY-MM-DD HH:mm:ss'),
                    msg_from: 'client',
                }
                props.chatSendNewMessage(props.token, form)
                inputMsgRef.current.clear()
                Keyboard.dismiss()
                setMensagens([...mensagens, {
                    id: 0,
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss'),
                    ...form
                }])
            } else {

            }
        }
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs back={() => handleBackPress()} title='Finos e Cheirosos' />
            <ViewContainerInfo>
                <TextInfo>Solicitações de Profissionais</TextInfo>
                <TextInfo>Informações do serviço</TextInfo>
            </ViewContainerInfo>
            <ViewContainerChat>
                <ChatMessages messages={mensagens} userType={props.userType} />
            </ViewContainerChat>
            <ViewContainerNewMessage style={{ marginBottom: keyboardIsVisible ? 35 : 0 }}>
                <Input
                    ref={inputMsgRef}
                    placeholder='Digite sua mensagem'
                    placeholderTextColor={white}
                    containerStyle={{ flex: 1 }}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    inputStyle={{ backgroundColor: lightpurple, color: white, paddingTop: 0, paddingBottom: 0, borderRadius: 2 }} />
                <TouchIcon onPress={handleSendPress}>
                    <Icon name='send' size={25} color={gray} />
                </TouchIcon>
            </ViewContainerNewMessage>
        </KeyboardAvoidingView>
    )
}

ProfessionalChatScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        token: state.auth.token,
        isAuth: state.auth.isAuth,
        user: state.auth.userType === 'client' ? state.client.client : state.professional.professional,
        userType: state.auth.userType,
        selectedCategorie: state.categoria.selected,
        serviceSelected: state.services.selected,
        professionalSelected: state.professional.selected,
        lastId: state.chat.lastId,
        fcmToken: state.chat.fcmToken,
        sendedMessage: state.chat.sendedMessage,
        receivedMessage: state.chat.receivedMessage,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        chatSendNewMessage: (token, message) => dispatch(ActionCreators.chatSendNewMessage(token, message))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalChatScreen);