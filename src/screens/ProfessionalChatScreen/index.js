import React, { useState, useEffect, useRef } from 'react'
import { KeyboardAvoidingView, Platform, BackHandler, Keyboard, AppState } from 'react-native'
import { Input, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'

import { showNotification } from '../../components/common/util/localNotification'
import { updateBadge } from '../../components/common/util/badgeNotification'

import { gray, white, lightpurple, black } from '../../components/common/util/colors'
import {
    ViewContainerChat,
    ViewContainerNewMessage,
    TouchIcon,
    TxtAddressTitle,
    TxtAddress,
    TouchAddress,
    ViewTitleAddress,
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
import { ViewChatItem, ViewChatText, TextMessage, TextTime, ViewRow } from './styles'

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

    const onPressChatText = (text) => {
        if (text.indexOf("#") === 0) {
            const indexCode = text.indexOf("#") + 1;
            const indexEnd = text.indexOf(" ");
            const callId = text.substring(indexCode, indexEnd);
            props.navigation.navigate('CallsList', {
                previewScreen: 'ProfessionalChat',
                callId: callId,
            })
        }
    }

    return (
        <ViewChatItem justifyContent={mensagem.msg_from === userType ? 'flex-end' : 'flex-start'}>
            <ViewChatText onPress={() => onPressChatText(mensagem.message)} backColor={mensagem.msg_from === userType ? '#D3D4FE' : '#EAEAEA'} >
                {mensagem.msg_from === userType &&
                    <ViewRow>
                        <TextTime marginRight={10} marginLeft={0}>
                            {mensagem.time.substring(0, 5)}
                        </TextTime>
                        <TextMessage decoration={mensagem.message.indexOf("#") === 0 ? 'underline' : 'none'}>
                            {mensagem.message}
                        </TextMessage>
                    </ViewRow>}
                {mensagem.msg_from !== userType &&
                    <ViewRow>
                        <TextMessage decoration={mensagem.message.indexOf("#") === 0 ? 'underline' : 'none'}>
                            {mensagem.message}
                        </TextMessage>
                        <TextTime marginRight={0} marginLeft={10}>
                            {mensagem.time.substring(0, 5)}
                        </TextTime>
                    </ViewRow>}
            </ViewChatText>
        </ViewChatItem>
    )
}

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
                                    <ChateItem navigation={props.navigation} mensagem={item} userType={userType} />
                                </React.Fragment>
                            )
                        }
                        else {
                            const previousItem = messages[index - 1]
                            if (previousItem.date != item.date) {
                                return (
                                    <React.Fragment key={index} >
                                        <ChatTextDate mensagem={item} />
                                        <ChateItem navigation={props.navigation} mensagem={item} userType={userType} />
                                    </React.Fragment>
                                )
                            }
                            else {
                                return <ChateItem navigation={props.navigation} key={index} mensagem={item} userType={userType} />
                            }
                        }
                    })
                }
            </ScrollViewContainerMessages>
        </React.Fragment>
    )
}

function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [mensagens, setMensagens] = useState([])
    const [addressVisible, setAddressVisible] = useState(false)

    const inputMsgRef = useRef()
    const appStateRef = useRef()
    const wsRef = useRef()
    const messagesRef = useRef()
    const routeRef = useRef()

    const getMessages = useGet('', props.token)

    useEffect(() => {
        appStateRef.current = 'active'

        console.log('props.professionalSelected.id', props.professionalSelected.id)
        console.log('props.clientSelected.id', props.clientSelected.id)
        console.log('props.user.id', props.user.id)

        props.chatSetScreenChatVisible(true)

        AppState.addEventListener('change', handleAppStateChange)

        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress)

        const kbShow = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true)
        })
        const knHide = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false)
        })

        cleanBadge()

        carregarMensagens(true)

        const type_ = props.userType;
        const from_ = props.user.id;
        const to_ = props.userType === 'client' ? props.professionalSelected.id : props.clientSelected.id;
        const token_ = props.token;
        wsRef.current = new WebSocket(`ws://67.205.160.187:8080?type=${type_}&from=${from_}&to=${to_}&token=${token_}`);

        wsRef.current.onopen = (e) => {
            console.log('Socket Opened', JSON.stringify(e))
        };

        wsRef.current.onclose = (e) => {
            console.log('Socket Closed', JSON.stringify(e))
            if (e.message && e.message === 'Connection reset') {
                //tentar reconectar
                wsRef.current = new WebSocket(`ws://67.205.160.187:8080?type=${type_}&from=${from_}&to=${to_}&token=${token_}`);
            }
        };

        wsRef.current.onerror = (e) => {
            console.log('Socket Error', JSON.stringify(e))
        };

        wsRef.current.onmessage = (e) => {
            try {
                const messageObj = {
                    ...JSON.parse(e.data),
                    date: Moment().format('DD/MM/YYYY'),
                    time: Moment().format('HH:mm:ss')
                }

                if (props.professionalSelected.id) {
                    if (messageObj.professional_id == props.professionalSelected.id && messageObj.client_id == props.user.id) {
                        if (props.userType !== messageObj.msg_from) {
                            setMensagens([...messagesRef.current, messageObj])
                        }
                    }
                    else {
                        //gerar badge e push local da msg de outra pessoa
                        console.log('messageObj => ', JSON.stringify(messageObj))
                        const msgBadge = {
                            ...messageObj,
                            type: 'chat',
                        }
                        const notification = {
                            title: messageObj.title,
                            body: messageObj.message,
                            data: messageObj,
                        }
                        updateBadge(msgBadge)
                        showNotification(notification)
                    }
                }
                else {
                    if (messageObj.professional_id == props.user.id && messageObj.client_id == props.clientSelected.id) {
                        if (props.userType !== messageObj.msg_from) {
                            setMensagens([...messagesRef.current, messageObj])
                        }
                    }
                    else {
                        //gerar badge e push local da msg de outra pessoa
                        console.log('messageObj => ', JSON.stringify(messageObj))
                        const msgBadge = {
                            ...messageObj,
                            type: 'chat',
                        }
                        const notification = {
                            title: messageObj.title,
                            body: messageObj.message,
                            data: messageObj,
                        }
                        updateBadge(msgBadge)
                        showNotification(notification)
                    }
                }

                const storageName = `@msg_c_${messageObj.client_id}_p_${messageObj.professional_id}`
                AsyncStorage.getItem(storageName, (err, result) => {
                    const newMessage = [messageObj]
                    if (result !== null) {
                        const arrayMessages = JSON.parse(result).concat(newMessage)
                        AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                    } else {
                        AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
                    }
                })
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

    useEffect(() => {
        if (props.newCallMsg.data) {
            //enviar msg
            sendMessageSocket(`#${props.newCall.id} - ${props.newCallMsg.data.message}`)
            props.professionalNewCallClearMsg()
        }
    }, [props.newCallMsg])

    useEffect(() => {
        if (props.route) {
            routeRef.current = props.route
        }
    }, [props.route])

    const cleanBadge = async () => {
        try {
            let itemToClean = {}
            if (props.professionalSelected.id) {
                itemToClean = {
                    client_id: props.user.id,
                    professional_id: props.professionalSelected.id
                }
            }
            else {
                itemToClean = {
                    client_id: props.clientSelected.id,
                    professional_id: props.user.id
                }
            }
            const storageName = `@badgeChat`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadgeChat = JSON.parse(strBadge)
            if (arrayBadgeChat != null) {
                const array = arrayBadgeChat.filter((item) => item.client_id != itemToClean.client_id && item.professional_id != itemToClean.professional_id)
                const array2 = arrayBadgeChat.filter((item) => item.client_id == itemToClean.client_id && item.professional_id == itemToClean.professional_id)
                if (array2.length > 0) {
                    const item = {
                        client_id: itemToClean.client_id,
                        professional_id: itemToClean.professional_id,
                        badge: 0
                    }
                    array.push(item)
                    props.chatSetUpdateChatBadge(true)
                }
                else {
                    const item = {
                        client_id: itemToClean.client_id,
                        professional_id: itemToClean.professional_id,
                        badge: 0
                    }
                    array.push(item)
                }
                await AsyncStorage.setItem(storageName, JSON.stringify(array));
            }
        } catch (e) {
            console.log('cleanBadge => ', e)
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
        if (routeRef.current && routeRef.current.params && routeRef.current.params.previewScreen === 'Splash') {
            if (props.userType === 'client') {
                props.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'CategoriesSearch',
                        },
                    ],
                })
            }
            else {
                props.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'ProfessionalHome',
                        },
                    ],
                })
            }
        }
        else {
            props.navigation.goBack()
        }

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
        if (newMessage && newMessage.length)
            sendMessageSocket(newMessage)
    }

    const sendMessageSocket = (newMessage) => {
        if (newMessage.length > 0) {
            if (props.userType == 'client') {
                const form = {
                    client_id: props.user.id,
                    professional_id: props.professionalSelected.id,
                    message: newMessage,
                    date_time: Moment().format('YYYY-MM-DD HH:mm:ss'),
                    msg_from: 'client',
                }

                wsRef.current.send(JSON.stringify(form));

                inputMsgRef.current.clear()
                //Keyboard.dismiss()
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

                wsRef.current.send(JSON.stringify(form));

                inputMsgRef.current.clear()
                //Keyboard.dismiss()
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
        props.navigation.navigate('NewCall', {
            previewScreen: 'ProfessionalChat',
        })
    }

    const handleTitlePress = () => {
        if (props.professionalSelected.id) {
            props.professionalSelectedRequest(props.professionalSelected)
            props.navigation.navigate('ProfessionalHomeView', {
                previewScreen: 'ProfessionalChat',
                viewProfile: true,
            })
        }
    }

    const toggleOverlay = () => {
        setAddressVisible(!addressVisible)
    }

    const handlePressSendAddress = (address) => {
        //enviar endereço no chat
        if (address) {
            setAddressVisible(false)
            sendMessageSocket(`${address.street}, ${address.street_number}, ${address.complement} - ${address.neighborhood} - ${address.city.name}/${address.city.state.initials}`)
        }
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
            <Container />
            <HeaderJobs
                title={props.professionalSelected.id ? props.professionalSelected.name : props.clientSelected.name}
                titlePress={() => handleTitlePress()}
                back={() => handleBackPress()}
                newCall={props.clientSelected.id ? () => handlePressNewCall() : null}
                addressPress={() => toggleOverlay()}
            />
            <ViewContainerChat>
                <ChatMessages navigation={props.navigation} messages={mensagens} userType={props.userType} />
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

            <Overlay isVisible={addressVisible} onBackdropPress={toggleOverlay} overlayStyle={{ height: 'auto' }}>
                <React.Fragment>
                    <ViewTitleAddress>
                        <Icon name='pin-drop' size={25} color={black} />
                        <TxtAddressTitle>Enviar endereço</TxtAddressTitle>
                    </ViewTitleAddress>
                    {props.user.professionalsAddresses && props.user.professionalsAddresses.map(address =>
                        <TouchAddress key={address.id} onPress={() => handlePressSendAddress(address)}>
                            <Icon name='radio-button-unchecked' size={25} color={black} />
                            <TxtAddress>{`${address.street}, ${address.street_number}, ${address.complement} - ${address.neighborhood} - ${address.city.name}/${address.city.state.initials}`}</TxtAddress>
                        </TouchAddress>
                    )}
                </React.Fragment>
            </Overlay>
        </KeyboardAvoidingView>
    )
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
        screenChatVisible: state.chat.screenChatVisible,
        newCallMsg: state.professional.newCallMsg,
        newCall: state.professional.newCall,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chatSendNewMessage: (token, message) => dispatch(ActionCreators.chatSendNewMessage(token, message)),
        chatCleanSendedMessage: () => dispatch(ActionCreators.chatCleanSendedMessage()),
        chatSetScreenChatVisible: (visible) => dispatch(ActionCreators.chatSetScreenChatVisible(visible)),
        professionalNewCallClearMsg: () => dispatch(ActionCreators.professionalNewCallClearMsg()),
        professionalSelectedRequest: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
        chatSetUpdateChatBadge: (updateChatBadge) => dispatch(ActionCreators.chatSetUpdateChatBadge(updateChatBadge)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalChatScreen)