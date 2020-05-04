import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler, Keyboard, AppState } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'

import { gray, white, lightpurple } from '../../components/common/util/colors'
import {
    ViewContainerChat,
    ViewContainerNewMessage,
    TouchIcon,
} from './styles'
import Container from '../../components/Container/index'
import HeaderJobs from '../../components/HeaderJobs/index'
import useGet from '../../services/restServices'

import ActionCreators from '../../store/actionCreators'

///////ChatMessages
import { ScrollViewContainerMessages } from './styles'

///////ChatTextDate
import { ViewChatDate, TextChatDate } from './styles'

///////ChatItem
import { ViewChatItem, ViewChatText, TextMessage, TextTime } from './styles'

function ChatMessages(props) {
    const { messages } = props
    const { userType } = props

    const scrollViewRef = useRef()

    const handleContentSizeChange = (contentWidth, contentHeight) => {
        scrollViewRef.current.scrollTo({ x: 0, y: contentHeight, animated: true })
    }

    return (
        <React.Fragment>
            <ScrollViewContainerMessages
                ref={(c) => scrollViewRef.current = c}
                onContentSizeChange={handleContentSizeChange}>
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
        </React.Fragment>

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
        <ViewChatItem justifyContent={mensagem.msg_from === userType ? 'flex-end' : 'flex-start'}>
            <ViewChatText
                backColor={mensagem.msg_from === userType ? '#D3D4FE' : '#EAEAEA'}
                marginRight={mensagem.msg_from === userType ? 0 : 50}
                marginLeft={mensagem.msg_from === userType ? 50 : 0}
            >
                {mensagem.msg_from === userType &&
                    <React.Fragment>
                        <TextTime marginRight={10} marginLeft={0}>
                            {mensagem.time.substring(0, 5)}
                        </TextTime>
                        <TextMessage style={{ marginRight: 20 }}>
                            {mensagem.message}
                        </TextMessage>
                    </React.Fragment>}
                {mensagem.msg_from !== userType &&
                    <React.Fragment>
                        <TextMessage>
                            {mensagem.message}
                        </TextMessage>
                        <TextTime marginRight={0} marginLeft={10}>
                            {mensagem.time.substring(0, 5)}
                        </TextTime>
                    </React.Fragment>}

            </ViewChatText>
        </ViewChatItem>
    )
}

function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [mensagens, setMensagens] = useState([])

    const inputMsgRef = useRef()
    const appStateRef = useRef()
    const wsRef = useRef()
    const messagesRef = useRef()

    const getMessages = useGet('', props.token)


    useEffect(() => {
        appStateRef.current = 'active'

        props.chatSetScreenChatVisible(true)

        AppState.addEventListener('change', handleAppStateChange)

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        const kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        const knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        updateChatBadge()
        carregarMensagens(true)

        const type_ = props.userType;
        const from_ = props.user.id;
        const to_ = props.userType === 'client' ? props.professionalSelected.id : props.clientSelected.id;
        const token_ = props.token;
        wsRef.current = new WebSocket(`ws://67.205.160.187:8080?type=${type_}&from=${from_}&to=${to_}&token=${token_}`);

        wsRef.current.onopen = (e) => {
            console.log('Socket Opened')
        };

        wsRef.current.onclose = (e) => {
            console.log('Socket Closed')
        };

        wsRef.current.onmessage = (e) => {
            try {
                const messageObj = {
                    ...JSON.parse(e.data),
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss')
                }

                if (props.userType !== messageObj.msg_from) {
                    setMensagens([...messagesRef.current, messageObj])
                }

                if (props.professionalSelected.id) {
                    const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                    AsyncStorage.getItem(storageName, (err, result) => {
                        const newMessage = [messageObj]
                        if (result !== null) {
                            const arrayMessages = JSON.parse(result).concat(newMessage)
                            AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                        } else {
                            AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
                        }
                    })
                }
                else {
                    const storageName = `@msg_c_${props.clientSelected.id}_p_${props.user.id}`
                    AsyncStorage.getItem(storageName, (err, result) => {
                        const newMessage = [messageObj]
                        if (result !== null) {
                            const arrayMessages = JSON.parse(result).concat(newMessage)
                            AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                        } else {
                            AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
                        }
                    })
                }
            } catch (ex) {
                console.log(ex)
            }
        };

        return () => {
            props.chatSetScreenChatVisible(false)
            backHandler.remove()
            kbShow.remove()
            knHide.remove()
            AppState.removeEventListener('change', handleAppStateChange)
            wsRef.current.close()
        }
    }, [])

    useEffect(() => {
        messagesRef.current = mensagens
    }, [mensagens])

    useEffect(() => {
        if (getMessages.data && getMessages.data.chatMessages) {
            console.log('New messages => ', getMessages.data.chatMessages.length)
            setMensagens(mensagens.concat(getMessages.data.chatMessages))

            if (getMessages.data.chatMessages.length > 0) {
                try {
                    if (props.professionalSelected.id) {
                        const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                        AsyncStorage.getItem(storageName, (err, result) => {
                            if (result !== null) {
                                const arrayMessages = JSON.parse(result).concat(getMessages.data.chatMessages)
                                AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                            } else {
                                AsyncStorage.setItem(storageName, JSON.stringify(getMessages.data.chatMessages))
                            }
                        })
                    }
                    else {
                        const storageName = `@msg_c_${props.clientSelected.id}_p_${props.user.id}`
                        AsyncStorage.getItem(storageName, (err, result) => {
                            if (result !== null) {
                                const arrayMessages = JSON.parse(result).concat(getMessages.data.chatMessages)
                                AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                            } else {
                                AsyncStorage.setItem(storageName, JSON.stringify(getMessages.data.chatMessages))
                            }
                        })
                    }
                } catch (ex) {
                    console.log(ex)
                }
            }
        }
    }, [getMessages.data]);

    /* useEffect(() => {
        if (props.sendedMessage && props.sendedMessage.id) {
            try {
                console.log('props.sendedMessage => ', props.sendedMessage)
                const sendedMessage = {
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss'),
                    ...props.sendedMessage
                }
                if (props.professionalSelected.id) {
                    const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                    AsyncStorage.getItem(storageName, (err, result) => {
                        const newMessage = [sendedMessage]
                        if (result !== null) {
                            const arrayMessages = JSON.parse(result).concat(newMessage)
                            AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                        } else {
                            AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
                        }
                    })
                }
                else {
                    const storageName = `@msg_c_${props.clientSelected.id}_p_${props.user.id}`
                    AsyncStorage.getItem(storageName, (err, result) => {
                        const newMessage = [sendedMessage]
                        if (result !== null) {
                            const arrayMessages = JSON.parse(result).concat(newMessage)
                            AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                        } else {
                            AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
                        }
                    })
                }
                props.chatCleanSendedMessage()
            } catch (e) {
                console.log(e)
            }
        }
    }, [props.sendedMessage]); */

    /* useEffect(() => {
        console.log('props.receivedMessage => ', props.receivedMessage)
        if (props.screenChatVisible && props.receivedMessage.id) {
            if (mensagens.length > 0) {
                const lastId = mensagens[mensagens.length - 1].id;
                if (lastId >= props.receivedMessage.id) {
                    if (props.professionalSelected.id) {
                        getMessages.refetch(`/chatMessages/messages.json?client_id=${props.user.id}&professional_id=${props.professionalSelected.id}&last_id=${lastId}`)
                    }
                    else {
                        getMessages.refetch(`/chatMessages/messages.json?client_id=${props.clientSelected.id}&professional_id=${props.user.id}&last_id=${lastId}`)
                    }
                }
                else {
                    setMensagens([...mensagens, {
                        date: Moment().format('DD/MM/YYYY'),
                        time: Moment().format('HH:mm:ss'),
                        ...props.receivedMessage
                    }])
                }
            }
            else {
                setMensagens([...mensagens, {
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss'),
                    ...props.receivedMessage
                }])
            }
        }
    }, [props.receivedMessage]); */

    const updateChatBadge = async () => {
        try {
            if (props.professionalSelected.id) {
                const storageName = `@badge_c_${props.user.id}_p_${props.professionalSelected.id}`
                await AsyncStorage.setItem(storageName, '0')
            }
            else {
                const storageName = `@badge_c_${props.clientSelected.id}_p_${props.user.id}`
                await AsyncStorage.setItem(storageName, '0')
            }
        } catch (e) {

        }
    }

    const carregarMensagens = async (changeState) => {
        try {
            if (props.professionalSelected.id) {
                const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                const messagesStr = await AsyncStorage.getItem(storageName)
                let _last = 0;
                if (messagesStr != null) {
                    const messages_ = JSON.parse(messagesStr)
                    if (messages_ && messages_.length) {
                        if (changeState) {
                            setMensagens(messages_)
                        }
                        if (messages_.length > 0) {
                            const lastIndex = messages_.length - 1;
                            _last = messages_[lastIndex].id
                        }
                    }
                }
                getMessages.refetch(`/chatMessages/messages.json?client_id=${props.user.id}&professional_id=${props.professionalSelected.id}&last_id=${_last}`)
            }
            else {
                const storageName = `@msg_c_${props.clientSelected.id}_p_${props.user.id}`
                const messagesStr = await AsyncStorage.getItem(storageName)
                let _last = 0;
                if (messagesStr != null) {
                    const messages_ = JSON.parse(messagesStr)
                    if (messages_ && messages_.length) {
                        if (changeState) {
                            setMensagens(messages_)
                        }
                        if (messages_.length > 0) {
                            const lastIndex = messages_.length - 1;
                            _last = messages_[lastIndex].id
                        }
                    }
                }
                getMessages.refetch(`/chatMessages/messages.json?client_id=${props.clientSelected.id}&professional_id=${props.user.id}&last_id=${_last}`)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleBackPress = async () => {
        props.navigation.goBack()
        return true
    }

    const handleAppStateChange = (nextAppState) => {
        if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
            carregarMensagens(false)
        }
        appStateRef.current = nextAppState
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
                //props.chatSendNewMessage(props.token, form)
                wsRef.current.send(JSON.stringify(form));

                inputMsgRef.current.clear()
                Keyboard.dismiss()
                setMensagens([...mensagens, {
                    id: 0,
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss'),
                    ...form
                }])
            } else {
                const form = {
                    client_id: props.clientSelected.id,
                    professional_id: props.user.id,
                    message: newMessage,
                    date_time: Moment().format('YYYY-MM-DD HH:mm:ss'),
                    msg_from: 'professional',
                }
                //props.chatSendNewMessage(props.token, form)
                wsRef.current.send(JSON.stringify(form));

                inputMsgRef.current.clear()
                Keyboard.dismiss()
                setMensagens([...mensagens, {
                    id: 0,
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss'),
                    ...form
                }])
            }
        }
    }

    const handlePressNewCall = () => {
        props.navigation.navigate('NewCall')
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs
                title={props.professionalSelected.id ? props.professionalSelected.name : props.clientSelected.name}
                back={() => handleBackPress()}
                newCall={props.clientSelected.id ? () => handlePressNewCall() : null}
            />
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
        user: state.professional.selected.id ? state.client.client : state.professional.professional,
        userType: state.professional.selected.id ? 'client' : 'professional',
        selectedCategorie: state.categoria.selected,
        serviceSelected: state.service.selected,
        professionalSelected: state.professional.selected,
        clientSelected: state.client.selected,
        lastId: state.chat.lastId,
        fcmToken: state.chat.fcmToken,
        sendedMessage: state.chat.sendedMessage,
        receivedMessage: state.chat.receivedMessage,
        screenChatVisible: state.chat.screenChatVisible,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        chatSendNewMessage: (token, message) => dispatch(ActionCreators.chatSendNewMessage(token, message)),
        chatCleanSendedMessage: () => dispatch(ActionCreators.chatCleanSendedMessage()),
        chatSetScreenChatVisible: (visible) => dispatch(ActionCreators.chatSetScreenChatVisible(visible)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalChatScreen);