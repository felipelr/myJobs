import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Platform } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging'
import axios from 'axios'
import PushNotificationIOS from "@react-native-community/push-notification-ios"
var PushNotification = require("react-native-push-notification")

import { urlMyJobsAPI } from '../../config/config'

import ActionCreators from '../../store/actionCreators'

import { useGet } from '../../services/useRequest'

import { showNotification } from '../../components/common/util/localNotification'
import { updateBadge } from '../../components/common/util/badgeNotification'

import { ViewContainer } from './styles'

function SplashScreen(props) {
    const [initialRoute, setInitialRoute] = useState('')

    const getRefreshInstaToken = useGet('')

    const chatVisibleRef = useRef()
    const openedFromNotificationRef = useRef()

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Splash => Message handled in the background!', remoteMessage);

        const data = remoteMessage.data

        let jsonMessage = null
        if (data.message)
            jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

        //salvar badge do chat ou call
        updateBadge(jsonMessage)

        updateProfessionalRating(jsonMessage)
    });

    PushNotification.configure({
        // (required) Called when a remote is received or opened, or local notification is opened
        onNotification: function (notification) {
            console.log("NOTIFICATION:", notification);
            // process the notification

            if (notification.foreground) {
                if (chatVisibleRef.current) {
                    props.navigation.goBack()
                }
                handleAppOpenedByNotification(notification, { message: JSON.stringify(notification.data) })
                props.navigation.navigate('ProfessionalChat', {
                    previewScreen: 'Splash',
                })

                // (required) Called when a remote is received or opened, or local notification is opened
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            }
        },
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
            alert: true,
            badge: true,
            sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
    });

    useEffect(() => {
        loginFromLocalStorage().then(route => {
            if (openedFromNotificationRef.current && openedFromNotificationRef.current.notification) {
                handleAppOpenedByNotification(openedFromNotificationRef.current.notification, openedFromNotificationRef.current.data)
                setInitialRoute('NotificationStart')
            }
            else {
                setInitialRoute(route)
            }
        })

        if (Platform.OS === 'ios') {
            firebaseRequestUserPermission()
        }

        //new methods
        const _onMessage = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived! => ', remoteMessage);

            const notification = remoteMessage.notification;
            const data = remoteMessage.data;

            let jsonMessage = null
            if (data.message)
                jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

            //salvar badge do chat ou call
            updateBadge(jsonMessage).then(result => {
                if (result) {
                    if (jsonMessage.type === 'call' || jsonMessage.type === 'call_finished') {
                        props.clientSetUpdateCallBadge(true)
                    }
                    else if (jsonMessage.type === 'rating') {

                    }
                    else {
                        props.chatSetUpdateChatBadge(true)
                    }
                }
            })

            updateProfessionalRating(jsonMessage)

            //local notification
            showNotification({ ...notification, data: jsonMessage })
        });

        const _onTokenRefresh = messaging().onTokenRefresh(token => {
            console.log('FCM Token Refresh => ', token)
            props.chatSetFcmToken(token)
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
                    openedFromNotificationRef.current = {
                        notification: remoteMessage.notification,
                        data: remoteMessage.data,
                    };
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

    const handleAppOpenedByNotification = (notification, data) => {
        if (data.message) {
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
                        props.authSetUserType('professional')
                        props.clientSelected(client)
                    }
                    else {
                        const professional = { id: msg.professional_id, name: notification.title }
                        props.authSetUserType('client')
                        props.professionalSelected(professional)
                    }
                }
            }
        }
    }

    const loginFromLocalStorage = async () => {
        try {
            const userData = await AsyncStorage.getItem('@userData')
            if (userData) {
                const loginData = JSON.parse(userData)
                const responseUser = await axios.get(`${urlMyJobsAPI}/users/view/${loginData.user.sub}.json`, {
                    headers: {
                        Authorization: 'Bearer ' + loginData.token
                    }
                })

                const { client } = responseUser.data.user
                const { professional } = responseUser.data.user

                if (client) {
                    console.log('LOCAL CLIENT => ', JSON.stringify(client))
                    await AsyncStorage.setItem('@clientData', JSON.stringify(client))
                    props.clientUpdateSuccess(client)
                }

                if (professional) {
                    console.log('LOCAL PROFESSIONAL => ', JSON.stringify(professional))
                    await AsyncStorage.setItem('@professionalData', JSON.stringify(professional))
                    props.professionalUpdateSuccess(professional)
                }

                const instaTokenLong = await AsyncStorage.getItem('@instaTokenLong')
                const instaUserID = await AsyncStorage.getItem('@instaUserID')

                const userType = professional && professional.id ? 'professional' : 'client'
                const userJson = { ...loginData, userType }

                //carregar instagram user id
                if (instaUserID && instaUserID.length)
                    props.authSetInstaUserId(instaUserID)

                //refresh instagram token
                if (instaTokenLong && instaTokenLong.length) {
                    //props.authSetInstaTokenLong(instaTokenLong)

                    //refresh instagram token
                    if (instaTokenLong && instaTokenLong.length) {
                        const data = await getRefreshInstaToken.refetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${instaTokenLong}`)
                        if (data && data.access_token) {
                            //resultado refreshed access token
                            props.authSetInstaTokenLong(data.access_token)
                        }
                    }
                }

                if (!professional.id && !client.id) {
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
            console.log('ERROR => ', e.message)
            await AsyncStorage.setItem('@userData', JSON.stringify({}));
            await AsyncStorage.setItem('@clientData', JSON.stringify({}));
            await AsyncStorage.setItem('@professionalData', JSON.stringify({}));

            return "LoginStart"
        }
    }

    const firebaseRequestUserPermission = async () => {
        try {
            const authStatus = await messaging().requestPermission();
            const enabled = authStatus === AuthorizationStatus.AUTHORIZED || authStatus === AuthorizationStatus.PROVISIONAL;
            if (enabled) {
                console.log('Authorization status:', authStatus);
            }
            else {
                console.log('NotAuthorization status:', authStatus);
            }
        } catch (error) {
            // User has rejected permissions
            console.log('User has rejected permissions', JSON.stringify(error));
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
            <ActivityIndicator size='large' color='#FFFFFF' style={{ alignSelf: "center" }} />
        </ViewContainer>
    )
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
        authSetUserType: (userType) => dispatch(ActionCreators.authSetUserType(userType)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)