import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage'

import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'
import CategoriesSearchScreen from './src/screens/CategoriesSearchScreen/index'
import PerfilScreen from './src/screens/PerfilScreen/index'
import ServicesScreen from './src/screens/ServicesScreen'
import ProfessionalHomeScreen from './src/screens/ProfessionalHomeScreen/index'
import ServiceHireScreen from './src/screens/ServiceHireScreen'
import ProfessionalChatScreen from './src/screens/ProfessionalChatScreen/index'
import SplashScreen from './src/screens/SplashScreen'
import NewCallScreen from './src/screens/NewCallScreen'
import ProfessionalListChatScreen from './src/screens/ProfessionalListChatScreen'
import ClientListChatScreen from './src/screens/ClientListChatScreen'
import CallsListScreen from './src/screens/CallsListScreen'
import ChatListScreen from './src/screens/ChatListScreen'

import store from './src/store'

const Stack = createStackNavigator();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
  const data = remoteMessage.data

  let jsonMessage = null
  if (data.message)
    jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

  //salvar badge do chat ou call
  updateBadge(jsonMessage)
});

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
  } catch (e) {
    console.log('erro => ', e)
  }
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          gestureEnabled: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Professionals" component={ProfessionalsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CategoriesSearch" component={CategoriesSearchScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Services" component={ServicesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfessionalHome" component={ProfessionalHomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfessionalHomeView" component={ProfessionalHomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ServiceHire" component={ServiceHireScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfessionalChat" component={ProfessionalChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NewCall" component={NewCallScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProfessionalListChat" component={ProfessionalListChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ClientListChat" component={ClientListChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CallsList" component={CallsListScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChatList" component={ChatListScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

AppRegistry.registerComponent('app', () => App);