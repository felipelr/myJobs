import React, { useEffect, useRef, useState } from 'react'
import { AppState, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'

import ActionCreators from '../../store/actionCreators'

import { useGet } from '../../services/useRequest'

import { purple } from '../../components/common/util/colors'

import { ViewContainer, ImgLogoTipo } from './styles'

import assets from './assets'

var PushNotification = require("react-native-push-notification")

function SplashScreen(props) {
    const [initialRoute, setInitialRoute] = useState('')

    const getRefreshInstaToken = useGet('')

    const chatVisibleRef = useRef()

    useEffect(() => {
        getUserData().then(route => {
            setInitialRoute(route)
        })
        firebaseRequestUserPermission()

        //new methods
        const _onMessage = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived! => ', remoteMessage);

            const notification = remoteMessage.notification;
            const data = remoteMessage.data;

            let jsonMessage = null
            if (data.message)
                jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

            //salvar badge do chat ou call
            updateBadge(jsonMessage)

            updateProfessionalRating(jsonMessage)

            //local notification
            showNotification(notification)
        });

        const _onTokenRefresh = messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notification caused app to open from background state => ', remoteMessage);
            handleAppOpenedByNotification(remoteMessage.notification, remoteMessage.data)
            setInitialRoute('NotificationStart')
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state => ', remoteMessage);
                    getUserData().then(route => {
                        handleAppOpenedByNotification(remoteMessage.notification, remoteMessage.data)
                        setInitialRoute('NotificationStart')
                    })
                }
            });

        messaging()
            .getToken()
            .then(token => {
                if (token) {
                    console.log('FCM Token => ', token)
                    props.chatSetFcmToken(token)
                }
            });

        return () => {
            _onMessage
            _onTokenRefresh
        }
    }, [])

    useEffect(() => {
        chatVisibleRef.current = props.screenChatVisible
    }, [props.screenChatVisible])

    useEffect(() => {
        if (initialRoute === 'ProfessionalStart') {
            props.navigation.navigate('ProfessionalHome', {
                previewScreen: 'Splash',
            })
        }
        else if (initialRoute === 'ClientStart') {
            props.navigation.navigate('CategoriesSearch', {
                previewScreen: 'Splash',
            })
        }
        else if (initialRoute === 'LoginStart') {
            props.navigation.navigate('Login', {
                previewScreen: 'Splash',
            })
        }
        else if (initialRoute === 'NotificationStart') {
            props.navigation.navigate('ProfessionalChat', {
                previewScreen: 'Splash',
            })
        }
    }, [initialRoute])

    useEffect(() => {
        if (getRefreshInstaToken.data && getRefreshInstaToken.data.access_token) {
            //resultado refreshed access token
            props.authSetInstaTokenLong(getRefreshInstaToken.data.access_token)
        }
    }, [getRefreshInstaToken.data])

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);

        const data = remoteMessage.data

        let jsonMessage = null
        if (data.message)
            jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

        //salvar badge do chat ou call
        updateBadge(jsonMessage)

        updateProfessionalRating(jsonMessage)
    });

    const handleAppOpenedByNotification = (notification, data) => {
        if (data.message) {
            if (!chatVisibleRef.current) {
                if (props.professional || props.client) {
                    const msg = JSON.parse(data.message)

                    if (msg.type === 'call') {
                        //abrir tela de chamados
                    }
                    else if (msg.type === 'call_finished') {
                        //abrir tela de chamados finalizados
                    }
                    else if (msg.type === 'rating') {
                        //abrir home do profissional
                    }
                    else {
                        if (msg.msg_from == 'client') {
                            const client = { id: msg.client_id, name: notification.title }
                            props.clientSelected(client)
                        }
                        else {
                            const professional = { id: msg.professional_id, name: notification.title }
                            props.professionalSelected(professional)
                        }
                    }
                }
            }
        }
    }

    const showNotification = (notification) => {
        //firebase.notifications().displayNotification(notification)  

        PushNotification.localNotification({
            /* Android Only Properties */
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_myjobs", // (optional) default: "ic_launcher"
            smallIcon: "ic_myjobs", // (optional) default: "ic_notification" with fallback for "ic_launcher"
            color: purple, // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            priority: "high", // (optional) set notification priority, default: high
            visibility: "private", // (optional) set notification visibility, default: private
            importance: "high", // (optional) set notification importance, default: high
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

            /* iOS and Android properties */
            title: notification.title, // (optional)
            message: notification.body, // (required)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)                
        });
    }

    const updateBadge = async (msg) => {
        try {
            if (msg.type === 'call' || msg.type === 'call_finished') {
                updateCallBadge(msg)
            }
            else if (msg.type === 'rating') {
                //badge para avaliação
            }
            else {
                updateChatBadge(msg)
            }
        } catch (e) {
            console.log('updateBadge => ', e)
        }
    }

    const updateCallBadge = async (msg) => {
        try {
            const storageName = `@badgeCall`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadgeCall = JSON.parse(strBadge)
            if (arrayBadgeCall != null) {
                const array = arrayBadgeCall.filter((item) => item.client_id != msg.client_id && item.professional_id != msg.professional_id)
                const array2 = arrayBadgeCall.filter((item) => item.client_id == msg.client_id && item.professional_id == msg.professional_id)
                if (array2.length > 0) {
                    const item = {
                        client_id: msg.client_id,
                        professional_id: msg.professional_id,
                        call_id: msg.call_id,
                        badge: array2[0].badge + 1
                    }
                    array.push(item)
                }
                else {
                    const item = {
                        client_id: msg.client_id,
                        professional_id: msg.professional_id,
                        call_id: msg.call_id,
                        badge: 1
                    }
                    array.push(item)
                }
                await AsyncStorage.setItem(storageName, JSON.stringify(array));
            }
            else {
                const array = []
                const item = {
                    client_id: msg.client_id,
                    professional_id: msg.professional_id,
                    call_id: msg.call_id,
                    badge: 1
                }
                array.push(item)
                await AsyncStorage.setItem(storageName, JSON.stringify(array));
            }
            props.clientSetUpdateCallBadge(true)
        } catch (e) {
            console.log('erro => ', e)
        }
    }

    const updateChatBadge = async (msg) => {
        try {
            const storageName = `@badgeChat`
            const strBadge = await AsyncStorage.getItem(storageName)
            const arrayBadgeChat = JSON.parse(strBadge)
            if (arrayBadgeChat != null) {
                const array = arrayBadgeChat.filter((item) => item.client_id != msg.client_id && item.professional_id != msg.professional_id)
                const array2 = arrayBadgeChat.filter((item) => item.client_id == msg.client_id && item.professional_id == msg.professional_id)
                if (array2.length > 0) {
                    const item = {
                        client_id: msg.client_id,
                        professional_id: msg.professional_id,
                        badge: array2[0].badge + 1
                    }
                    array.push(item)
                }
                else {
                    const item = {
                        client_id: msg.client_id,
                        professional_id: msg.professional_id,
                        badge: 1
                    }
                    array.push(item)
                }
                await AsyncStorage.setItem(storageName, JSON.stringify(array));
            }
            else {
                const array = []
                const item = {
                    client_id: msg.client_id,
                    professional_id: msg.professional_id,
                    badge: 1
                }
                array.push(item)
                await AsyncStorage.setItem(storageName, JSON.stringify(array));
            }
            props.chatSetUpdateChatBadge(true)
        } catch (e) {
            console.log('erro => ', e)
        }
    }

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('@userData')
            if (userData) {
                const clientData = await AsyncStorage.getItem('@clientData')
                const professionalData = await AsyncStorage.getItem('@professionalData')
                const instaTokenLong = await AsyncStorage.getItem('@instaTokenLong')
                const instaUserID = await AsyncStorage.getItem('@instaUserID')

                const clientJson = clientData ? JSON.parse(clientData) : null
                const professionalJson = professionalData ? JSON.parse(professionalData) : null

                let userType = professionalJson && professionalJson.id ? 'professional' : 'client'
                const userJson = { ...JSON.parse(userData), userType }

                if (clientJson !== null && clientJson.id)
                    props.clientUpdateSuccess(clientJson)

                if (professionalJson !== null && professionalJson.id)
                    props.professionalUpdateSuccess(professionalJson)

                //carregar instagram user id
                if (instaUserID && instaUserID.length)
                    props.authSetInstaUserId(instaUserID)

                //refresh instagram token
                if (instaTokenLong && instaTokenLong.length) {
                    //props.authSetInstaTokenLong(instaTokenLong)

                    //refresh instagram token
                    if (instaTokenLong && instaTokenLong.length) {
                        getRefreshInstaToken.refetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instaTokenLong}`)
                    }
                }

                if (!professionalJson.id && !clientJson.id) {
                    await AsyncStorage.setItem('@userData', JSON.stringify({}));
                    await AsyncStorage.setItem('@clientData', JSON.stringify({}));
                    await AsyncStorage.setItem('@professionalData', JSON.stringify({}));

                    return "LoginStart"
                }
                else {
                    props.authSuccess(userJson)

                    if (userType === 'client') {
                        return "ClientStart"
                    }
                    else {
                        return "ProfessionalStart"
                    }
                }

            } else {
                await AsyncStorage.setItem('@userData', JSON.stringify({}));
                await AsyncStorage.setItem('@clientData', JSON.stringify({}));
                await AsyncStorage.setItem('@professionalData', JSON.stringify({}));

                return "LoginStart"
            }
        } catch (e) {
            await AsyncStorage.setItem('@userData', JSON.stringify({}));
            await AsyncStorage.setItem('@clientData', JSON.stringify({}));
            await AsyncStorage.setItem('@professionalData', JSON.stringify({}));

            return "LoginStart"
        }
    }

    const firebaseRequestUserPermission = async () => {
        try {
            const settings = await messaging().requestPermission();
            if (settings) {
                console.log('Permission settings:', settings);
            }
        } catch (error) {
            // User has rejected permissions
            console.log('User has rejected permissions', error)
            Alert.alert('User has rejected permissions => ', JSON.stringify(error));
        }
    }

    const updateProfessionalRating = (jsonMessage) => {
        try {
            if (jsonMessage && jsonMessage != null) {
                if (jsonMessage.type === 'rating') {
                    props.professionalSetRatingUpdated(true)
                }
            }
        } catch (error) {
            console.log('updateProfessionalRating => ', JSON.stringify(error))
        }
    }

    return (
        <ViewContainer>
            <StatusBar backgroundColor={purple} barStyle='light-content' />
            <ImgLogoTipo source={assets.myjobs} />
        </ViewContainer>
    )
}

SplashScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps,
        screenChatVisible: state.chat.screenChatVisible,
        client: state.client.client,
        professional: state.professional.professional,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientUpdateSuccess: (dados) => dispatch(ActionCreators.clientUpdateSuccess(dados)),
        professionalUpdateSuccess: (dados) => dispatch(ActionCreators.professionalUpdateSuccess(dados)),
        authSuccess: (dados) => dispatch(ActionCreators.authSuccess(dados)),
        chatSetFcmToken: (fcmToken) => dispatch(ActionCreators.chatSetFcmToken(fcmToken)),
        clientSelected: (client) => dispatch(ActionCreators.clientSelected(client)),
        professionalSelected: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
        chatSetUpdateChatBadge: (updateChatBadge) => dispatch(ActionCreators.chatSetUpdateChatBadge(updateChatBadge)),
        clientSetUpdateCallBadge: (updateChatBadge) => dispatch(ActionCreators.clientSetUpdateCallBadge(updateChatBadge)),
        authSetInstaTokenLong: (token) => dispatch(ActionCreators.authSetInstaTokenLong(token)),
        authSetInstaUserId: (id) => dispatch(ActionCreators.authSetInstaUserId(id)),
        professionalSetRatingUpdated: (updated) => dispatch(ActionCreators.professionalSetRatingUpdated(updated)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)