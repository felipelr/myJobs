import React, { useEffect, useRef } from 'react'
import { AppState, StatusBar } from 'react-native'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import ActionCreators from '../../store/actionCreators'

import { purple } from '../../components/common/util/colors'

import { ViewContainer, ImgLogoTipo } from './styles'

import assets from './assets'

function SplashScreen(props) {
    const chatVisibleRef = useRef()
    const appStateRef = useRef()

    useEffect(() => {

        getUserData()
        firebasePermission()
        appStateRef.current = 'active'

        AppState.addEventListener('change', handleAppStateChange)

        const channel = new firebase.notifications.Android.Channel('myjobs-channel', 'MyJobs', firebase.notifications.Android.Importance.Max)
            .setDescription('MyJobs channel')
            .setVibrationPattern([1000, 2000, 3000])
            .setShowBadge(true);

        //cria um channel para poder exibir notificações
        firebase.notifications().android.createChannel(channel)

        const notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            if (notification.data.message)
                props.chatSetReceivedMessage(JSON.parse(notification.data.message))

            notification.setSound('sound_1.mp3')
            notification.android.setDefaults(firebase.notifications.Android.Defaults.All)
            notification.android.setChannelId(channel.channelId)
            notification.android.setVibrate(channel.vibrationPattern)
            notification.android.setPriority(firebase.notifications.Android.Priority.High)
            notification.android.setSmallIcon('ic_launcher')
            notification.android.setColorized(true)
            notification.android.setColor('purple')

            //salvar badge do chat
            updateChatBadge(JSON.parse(notification.data.message))

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
                        if (msg.msg_from == 'client') {
                            const client = { id: msg.client_id, name: notification.title }
                            props.clientSelected(client)
                        }
                        else {
                            const professional = { id: msg.professional_id, name: notification.title }
                            props.professionalSelected(professional)
                        }
                        props.navigation.navigate('ProfessionalChat')
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

        return () => {
            notificationListener()
            notificationOpenedListener()
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, [])

    useEffect(() => {
        chatVisibleRef.current = props.screenChatVisible
    }, [props.screenChatVisible])

    const showNotification = (notification) => {
        if (!chatVisibleRef.current || appStateRef.current.match(/inactive|background/)) {
            firebase.notifications().displayNotification(notification)
        }
    }

    const handleAppStateChange = (nextAppState) => {
        appStateRef.current = nextAppState
    }

    const updateChatBadge = async (msg) => {
        try {
            const storageName = `@badge_c_${msg.client_id}_p_${msg.professional_id}`
            const strBadge = await AsyncStorage.getItem(storageName)
            let badge = 0;
            if (strBadge) {
                badge = parseInt(strBadge) + 1;
            }
            else {
                badge = 1;
            }
            await AsyncStorage.setItem(storageName, badge.toString());
        } catch (e) {

        }
    }

    const getUserData = async () => {
        try {
            setTimeout(async () => {
                const userData = await AsyncStorage.getItem('@userData')
                if (userData) {
                    const clientData = await AsyncStorage.getItem('@clientData')
                    const professionalData = await AsyncStorage.getItem('@professionalData')

                    let userType = professionalData ? 'professional' : 'client'

                    const userJson = { ...JSON.parse(userData), userType }
                    const clientJson = clientData ? JSON.parse(clientData) : null
                    const professionalJson = professionalData ? JSON.parse(professionalData) : null

                    if (clientJson !== null && clientJson.id)
                        props.clientUpdateSuccess(clientJson)

                    if (professionalJson !== null && professionalJson.id)
                        props.professionalUpdateSuccess(professionalJson)

                    if (!professionalJson.id && !clientJson.id) {
                        await AsyncStorage.setItem('@userData', JSON.stringify({}));
                        await AsyncStorage.setItem('@clientData', JSON.stringify({}));
                        await AsyncStorage.setItem('@professionalData', JSON.stringify({}));
                        props.navigation.navigate('Login')
                    }
                    else {
                        props.authSuccess(userJson)

                        if (userType === 'client')
                            props.navigation.navigate('CategoriesSearch')
                        else
                            props.navigation.navigate('ProfessionalHome')
                    }

                } else {
                    await AsyncStorage.setItem('@userData', JSON.stringify({}));
                    await AsyncStorage.setItem('@clientData', JSON.stringify({}));
                    await AsyncStorage.setItem('@professionalData', JSON.stringify({}));
                    props.navigation.navigate('Login')
                }
            }, 2000)
        } catch (e) {
            await AsyncStorage.setItem('@userData', JSON.stringify({}));
            await AsyncStorage.setItem('@clientData', JSON.stringify({}));
            await AsyncStorage.setItem('@professionalData', JSON.stringify({}));
            props.navigation.navigate('Login')
        }
    }

    const firebasePermission = async () => {
        try {
            const enabled = await firebase.messaging().hasPermission();
            if (enabled) {
                // user has permissions
                console.log('has permissions')
            } else {
                // user doesn't have permission
                try {
                    await firebase.messaging().requestPermission();
                    console.log('has authorised')
                    // User has authorised
                } catch (error) {
                    // User has rejected permissions
                    console.log('User has rejected permissions', error)
                    alert('User has rejected permissions => ' + error.message)
                }
            }
        } catch (error) {
            // User has rejected permissions
            console.log('User has rejected permissions', error)
            alert('User has rejected permissions => ' + error.message)
        }
    }

    return (
        <ViewContainer>
            <StatusBar backgroundColor={purple} />
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
        chatSetReceivedMessage: (message) => dispatch(ActionCreators.chatSetReceivedMessage(message)),
        clientSelected: (client) => dispatch(ActionCreators.clientSelected(client)),
        professionalSelected: (professional) => dispatch(ActionCreators.professionalSelected(professional)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)