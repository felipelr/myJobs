import React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

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

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
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