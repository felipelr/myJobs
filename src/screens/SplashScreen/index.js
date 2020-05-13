import React, { useEffect, useRef } from 'react'
import { AppState, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'

import ActionCreators from '../../store/actionCreators'

import { purple, white, black } from '../../components/common/util/colors'

import { ViewContainer, ImgLogoTipo } from './styles'

import assets from './assets'

var PushNotification = require("react-native-push-notification")

function SplashScreen(props) {
    const chatVisibleRef = useRef()
    const appStateRef = useRef()

    useEffect(() => {
        getUserData()
        firebaseRequestUserPermission()
        appStateRef.current = 'active'

        AppState.addEventListener('change', handleAppStateChange)

        /* 
        const channel = new firebase.notifications.Android.Channel('myjobs-channel', 'MyJobs', firebase.notifications.Android.Importance.Max)
            .setDescription('MyJobs channel')
            .setVibrationPattern([1000, 2000, 3000])
            .setShowBadge(true);

        //cria um channel para poder exibir notificações
        firebase.notifications().android.createChannel(channel)

        const notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            let jsonMessage = null
            if (notification.data.message)
                jsonMessage = typeof notification.data.message == 'string' ? JSON.parse(notification.data.message) : notification.data.message

            notification.setSound('sound_1.mp3')
            notification.android.setDefaults(firebase.notifications.Android.Defaults.All)
            notification.android.setChannelId(channel.channelId)
            notification.android.setVibrate(channel.vibrationPattern)
            notification.android.setPriority(firebase.notifications.Android.Priority.High)
            notification.android.setSmallIcon('ic_myjobs')
            notification.android.setColorized(true)
            notification.android.setColor('purple')

            //salvar badge do chat ou call
            updateBadge(jsonMessage)

            //mostrar notificação
            showNotification(notification);
        })

        const notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            // Get information about the notification that was opened
            const notification = notificationOpen.notification

            if (notification.data.message) {
                if (!chatVisibleRef.current) {
                    if (props.professional || props.client) {
                        const msg = JSON.parse(notification.data.message)

                        if (msg.type == 'call') {

                        }
                        else if (msg.type == 'call_finished') {

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
                            props.navigation.navigate('ProfessionalChat', {
                                previewScreen: 'Splash',
                            })
                        }
                    }
                }
            }
        })

        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    // user has a device token
                    console.log(fcmToken)
                    props.chatSetFcmToken(fcmToken)
                } else {
                    // user doesn't have a device token yet
                }
            }); 
        */

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

            //local notification
            showNotification(notification)
        });

        const _onTokenRefresh = messaging().onTokenRefresh(token => {
            saveTokenToDatabase(token);
        });

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log('Notification caused app to open from background state => ', remoteMessage);
            handleAppOpenedByNotification(remoteMessage.notification, remoteMessage.data)
        });

        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log('Notification caused app to open from quit state => ', remoteMessage);
                    handleAppOpenedByNotification(remoteMessage.notification, remoteMessage.data)
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
            //notificationListener()
            //notificationOpenedListener()
            AppState.removeEventListener('change', handleAppStateChange)
            _onMessage
            _onTokenRefresh
        }
    }, [])

    useEffect(() => {
        chatVisibleRef.current = props.screenChatVisible
    }, [props.screenChatVisible])

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);

        const data = remoteMessage.data

        let jsonMessage = null
        if (data.message)
            jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

        //salvar badge do chat ou call
        updateBadge(jsonMessage)
    });

    const handleAppOpenedByNotification = (notification, data) => {
        if (data.message) {
            if (!chatVisibleRef.current) {
                if (props.professional || props.client) {
                    const msg = JSON.parse(data.message)

                    if (msg.type == 'call') {

                    }
                    else if (msg.type == 'call_finished') {

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
                        props.navigation.navigate('ProfessionalChat', {
                            previewScreen: 'Splash',
                        })
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

    const handleAppStateChange = (nextAppState) => {
        appStateRef.current = nextAppState
    }

    const updateBadge = async (msg) => {
        try {
            if (msg.type == 'call' || msg.type == 'call_finished') {
                updateCallBadge(msg)
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
            setTimeout(async () => {
                const userData = await AsyncStorage.getItem('@userData')
                if (userData) {
                    const clientData = await AsyncStorage.getItem('@clientData')
                    const professionalData = await AsyncStorage.getItem('@professionalData')

                    console.log('userData => ', userData)
                    console.log('clientData => ', clientData)
                    console.log('professionalData => ', professionalData)


                    const clientJson = clientData ? JSON.parse(clientData) : null
                    const professionalJson = professionalData ? JSON.parse(professionalData) : null

                    let userType = professionalJson && professionalJson.id ? 'professional' : 'client'
                    const userJson = { ...JSON.parse(userData), userType }

                    if (clientJson !== null && clientJson.id)
                        props.clientUpdateSuccess(clientJson)

                    if (professionalJson !== null && professionalJson.id)
                        props.professionalUpdateSuccess(professionalJson)

                    if (!professionalJson.id && !clientJson.id) {
                        await AsyncStorage.setItem('@userData', JSON.stringify({}));
                        await AsyncStorage.setItem('@clientData', JSON.stringify({}));
                        await AsyncStorage.setItem('@professionalData', JSON.stringify({}));
                        props.navigation.navigate('Login', {
                            previewScreen: 'Splash',
                        })
                    }
                    else {
                        props.authSuccess(userJson)

                        if (userType === 'client')
                            props.navigation.navigate('CategoriesSearch', {
                                previewScreen: 'Splash',
                            })
                        else
                            props.navigation.navigate('ProfessionalHome', {
                                previewScreen: 'Splash',
                            })
                    }

                } else {
                    await AsyncStorage.setItem('@userData', JSON.stringify({}));
                    await AsyncStorage.setItem('@clientData', JSON.stringify({}));
                    await AsyncStorage.setItem('@professionalData', JSON.stringify({}));
                    props.navigation.navigate('Login', {
                        previewScreen: 'Splash',
                    })
                }
            }, 2000)
        } catch (e) {
            await AsyncStorage.setItem('@userData', JSON.stringify({}));
            await AsyncStorage.setItem('@clientData', JSON.stringify({}));
            await AsyncStorage.setItem('@professionalData', JSON.stringify({}));
            props.navigation.navigate('Login', {
                previewScreen: 'Splash',
            })
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)