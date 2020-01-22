import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import firebase from 'react-native-firebase'

import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'
import CategoriesSearchScreen from './src/screens/CategoriesSearchScreen/index'
import PerfilScreen from './src/screens/PerfilScreen/index'
import ServicesScreen from './src/screens/ServicesScreen'
import ServiceHomeScreen from './src/screens/ServiceHomeScreen'
import ProfessionalHomeScreen from './src/screens/ProfessionalHomeScreen/index'
import ServiceHireScreen from './src/screens/ServiceHireScreen'
import ProfessionalChatScreen from './src/screens/ProfessionalChatScreen/index'
import SplashScreen from './src/screens/SplashScreen'
import NewCallScreen from './src/screens/NewCallScreen'

import store from './src/store'


const MainNavigator = createStackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Professionals: { screen: ProfessionalsScreen },
  CategoriesSearch: { screen: CategoriesSearchScreen },
  Perfil: { screen: PerfilScreen },
  Services: { screen: ServicesScreen },
  ServiceHome: { screen: ServiceHomeScreen },
  ProfessionalHome: { screen: ProfessionalHomeScreen },
  ServiceHire: { screen: ServiceHireScreen },
  ProfessionalChat: { screen: ProfessionalChatScreen },
  NewCall: { screen: NewCallScreen }
}, { initialRouteName: 'Splash' });

let Navigation = createAppContainer(MainNavigator)

export default function App() {

  useEffect(() => {
    firebasePermission()
  
    const messageListener = firebase.messaging().onMessage((message) => {
      // Process your message as required
      console.log(message)
    })
  
    const notificationListener = firebase.notifications().onNotification((notification) => {
      // Process your notification as required
      console.log(notification)
    })
  
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log(fcmToken)
        } else {
          // user doesn't have a device token yet
        }
      });
  
    return () => {
      messageListener()
      notificationListener()
    }
  }, [])
  
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
        }
      }
    } catch (error) {
      // User has rejected permissions
      console.log('User has rejected permissions', error)
    }
  }
  
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
} 