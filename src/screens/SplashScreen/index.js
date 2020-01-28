import React, { useEffect } from 'react'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'

import ActionCreators from '../../store/actionCreators'

import { ViewContainer } from './styles'

function SplashScreen(props) {

    useEffect(() => {
        getUserData()
        firebasePermission()

        const channel = new firebase.notifications.Android.Channel('myjobs-channel', 'MyJobs', firebase.notifications.Android.Importance.Max)
            .setDescription('MyJobs channel');

        //cria um channel para poder exibir notificações
        firebase.notifications().android.createChannel(channel);

        const messageListener = firebase.messaging().onMessage((message) => {
            // Process your message as required
            console.log(message)
        })

        const notificationListener = firebase.notifications().onNotification((notification) => {
            // Process your notification as required
            props.chatSetReceivedMessage(JSON.parse(notification.data.message))

            notification.android.setChannelId(channel.channelId)
            notification.setSound('default')
            notification.android.setColorized(true)
            notification.android.setColor('purple')

            firebase.notifications().displayNotification(notification)
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
            messageListener()
            notificationListener()
        }
    }, [])

    const getUserData = async () => {
        try {
            const userData = await AsyncStorage.getItem('@userData')
            if (userData) {
                const clientData = await AsyncStorage.getItem('@clientData')
                const professionalData = await AsyncStorage.getItem('@professionalData')

                let userType = professionalData ? 2 : 1

                const userJson = { ...JSON.parse(userData), userType }
                const clientJson = clientData ? JSON.parse(clientData) : null
                const professionalJson = professionalData ? JSON.parse(professionalData) : null

                if (clientJson !== null)
                    props.clientUpdateSuccess(clientJson)

                if (professionalJson !== null)
                    props.professionalUpdateSuccess(professionalJson)

                props.authSuccess(userJson)

                if (userType === 1)
                    props.ownProps.navigation.navigate('CategoriesSearch')
                else
                    props.ownProps.navigation.navigate('ProfessionalHome')
            } else {
                props.ownProps.navigation.navigate('Login')
            }
        } catch (e) {
            props.ownProps.navigation.navigate('Login')
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
        </ViewContainer>
    )
}

SplashScreen.navigationOptions = {
    header: null
}

const mapStateToProps = (state, ownProps) => {
    return {
        ownProps: ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clientUpdateSuccess: (dados) => dispatch(ActionCreators.clientUpdateSuccess(dados)),
        professionalUpdateSuccess: (dados) => dispatch(ActionCreators.professionalUpdateSuccess(dados)),
        authSuccess: (dados) => dispatch(ActionCreators.authSuccess(dados)),
        chatSetFcmToken: (fcmToken) => dispatch(ActionCreators.chatSetFcmToken(fcmToken)),
        chatSetReceivedMessage: (message) => dispatch(ActionCreators.chatSetReceivedMessage(message)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)