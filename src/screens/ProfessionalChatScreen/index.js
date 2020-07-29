import React, { useState, useEffect, useRef } from 'react'
import { Platform, BackHandler, Keyboard, AppState, ActivityIndicator } from 'react-native'
import { Input, Overlay } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import Moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'

import { showNotification } from '../../components/common/util/localNotification'
import { updateBadge } from '../../components/common/util/badgeNotification'

import { gray, white, lightpurple, black, purple } from '../../components/common/util/colors'
import {
    ViewContainerChat,
    ViewContainerNewMessage,
    TouchIcon,
    TxtAddressTitle,
    TxtAddress,
    TouchAddress,
    ViewTitleAddress,
} from './styles'

import Container from '../../components/Container'
import HeaderJobs from '../../components/HeaderJobs'
import ChatMessages from '../../components/ChatMessages'

import useGet from '../../services/restServices'

import ActionCreators from '../../store/actionCreators'

function ProfessionalChatScreen(props) {
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false)
    const [mensagens, setMensagens] = useState([])
    const [addressVisible, setAddressVisible] = useState(false)
    const [lastMessage, setLastMessage] = useState('')
    const [contentSize, setContentSize] = useState(50)
    const [loadingMoreMessages, setLoadingMoreMessages] = useState(false)

    const inputMsgRef = useRef()
    const appStateRef = useRef()
    const wsRef = useRef()
    const messagesRef = useRef()
    const routeRef = useRef()
    const socketResetRef = useRef()

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

        cleanBadge()
        carregarMensagens(true)

        socketConnect()

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

    useEffect(() => {
        if (socketResetRef.current) {
            socketResetRef.current = false;
            if (lastMessage.length) {
                sendMessageSocket(lastMessage);
            }
        }
    }, [socketResetRef.current])

    useEffect(() => {
        if (contentSize > 50) {
            loadMoreMessages()
        }
    }, [contentSize])

    const socketConnect = (message = '') => {
        const type_ = props.userType;
        const from_ = props.user.id;
        const to_ = props.userType === 'client' ? props.professionalSelected.id : props.clientSelected.id;
        const token_ = props.token;
        wsRef.current = new WebSocket(`ws://67.205.160.187:8080?type=${type_}&from=${from_}&to=${to_}&token=${token_}`);

        wsRef.current.onopen = (e) => {
            console.log('Socket Opened', JSON.stringify(e))
            if (message.length) {
                sendMessageSocket(message)
            }
        };

        wsRef.current.onclose = (e) => {
            console.log('Socket Closed', JSON.stringify(e))
            if (e.message && e.message === 'Connection reset') {
                //tentar reconectar
                setTimeout(function () {
                    socketConnect();
                    socketResetRef.current = true
                }, 1000);
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

                console.log('newMessage!: ', messageObj)

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
    }

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
                let lastId = 0;
                if (messagesStr != null) {
                    const allMessages = JSON.parse(messagesStr)
                    if (allMessages && allMessages.length) {
                        console.log('contentSize => ', contentSize)
                        console.log('allMessages.length => ', allMessages.length)
                        if (allMessages.length < (contentSize - 50)) {
                            return;
                        }

                        const filteredMessages = allMessages.filter(filterMessages)
                        filteredMessages.sort((a, b) => sortMessages(a, b))
                        if (changeState) {
                            setMensagens(filteredMessages)
                        }
                        if (filteredMessages.length > 0) {
                            const lastIndex = filteredMessages.length - 1;
                            lastId = filteredMessages[lastIndex].id
                        }
                    }
                }
                const response = await getMessages.refetch(`/chatMessages/messages.json?client_id=${props.user.id}&professional_id=${props.professionalSelected.id}&last_id=${lastId}`)
                if (response.chatMessages.length > 0) {
                    saveNewMessages(response)
                }
            }
            else {
                const storageName = `@msg_c_${props.clientSelected.id}_p_${props.user.id}`
                const messagesStr = await AsyncStorage.getItem(storageName)
                let lastId = 0;
                if (messagesStr != null) {
                    const allMessages = JSON.parse(messagesStr)
                    if (allMessages && allMessages.length) {
                        console.log('contentSize => ', contentSize)
                        console.log('allMessages.length => ', allMessages.length)
                        if (allMessages.length < (contentSize - 50)) {
                            return;
                        }

                        const filteredMessages = allMessages.filter(filterMessages)
                        filteredMessages.sort((a, b) => sortMessages(a, b))
                        if (changeState) {
                            setMensagens(filteredMessages)
                        }
                        if (filteredMessages.length > 0) {
                            const lastIndex = filteredMessages.length - 1;
                            lastId = filteredMessages[lastIndex].id
                        }
                    }
                }
                const response = await getMessages.refetch(`/chatMessages/messages.json?client_id=${props.clientSelected.id}&professional_id=${props.user.id}&last_id=${lastId}`)
                if (response.chatMessages.length > 0) {
                    saveNewMessages(response)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    const saveNewMessages = (response) => {
        setMensagens(mensagens.concat(response.chatMessages))
        try {
            if (props.professionalSelected.id) {
                const storageName = `@msg_c_${props.user.id}_p_${props.professionalSelected.id}`
                AsyncStorage.getItem(storageName, (err, result) => {
                    if (result !== null) {
                        const arrayMessages = JSON.parse(result).concat(response.chatMessages)
                        AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                    } else {
                        AsyncStorage.setItem(storageName, JSON.stringify(response.chatMessages))
                    }
                })
            }
            else {
                const storageName = `@msg_c_${props.clientSelected.id}_p_${props.user.id}`
                AsyncStorage.getItem(storageName, (err, result) => {
                    if (result !== null) {
                        const arrayMessages = JSON.parse(result).concat(response.chatMessages)
                        AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
                    } else {
                        AsyncStorage.setItem(storageName, JSON.stringify(response.chatMessages))
                    }
                })
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    const filterMessages = (item, index, arr) => {
        if (!item.id)
            return false

        if (index < (arr.length - contentSize))
            return false

        return true
    }

    const sortMessages = (itemA, itemB) => {
        const splitA = itemA.date.split("/")
        const splitB = itemB.date.split("/")
        const dateA = {
            day: parseInt(splitA[0]),
            month: parseInt(splitA[1]) - 1,
            year: parseInt(splitA[2]),
        }
        const dateB = {
            day: parseInt(splitB[0]),
            month: parseInt(splitB[1]) - 1,
            year: parseInt(splitB[2]),
        }
        const valueA = new Date(dateA.year, dateA.month, dateA.day)
        const valueB = new Date(dateB.year, dateB.month, dateB.day)
        return valueA.getTime() - valueB.getTime()
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
            setLastMessage(newMessage)
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
            props.professionalSetProfessionalView(props.professionalSelected)
            props.navigation.navigate('ProfessionalView', {
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

    const onScrollMessages = (event) => {
        if (event.nativeEvent.contentOffset.y == 0) {
            setContentSize(contentSize + 50)
        }
    }

    const loadMoreMessages = async () => {        
        setLoadingMoreMessages(true)
        await carregarMensagens(true)
        setLoadingMoreMessages(false)
    }

    const behavior = Platform.OS === 'ios' ? 'padding' : 'height'
    return (
        <React.Fragment>
            <Container />
            <HeaderJobs
                title={props.professionalSelected.id ? props.professionalSelected.name : props.clientSelected.name}
                titlePress={() => handleTitlePress()}
                back={() => handleBackPress()}
                newCall={props.clientSelected.id ? () => handlePressNewCall() : null}
                addressPress={() => toggleOverlay()}
            />
            <ViewContainerChat>
                {loadingMoreMessages && <ActivityIndicator size="small" color={purple} style={{ alignSelf: "center" }} />}
                <ChatMessages
                    messages={mensagens}
                    userType={props.userType}
                    navigation={props.navigation}
                    onScroll={onScrollMessages} />
            </ViewContainerChat>
            <ViewContainerNewMessage>
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
        </React.Fragment>
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
        chatSetUpdateChatBadge: (updateChatBadge) => dispatch(ActionCreators.chatSetUpdateChatBadge(updateChatBadge)),
        professionalSetProfessionalView: (professional) => dispatch(ActionCreators.professionalSetProfessionalView(professional)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalChatScreen)