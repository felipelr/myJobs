import React from 'react'
import { Easing, Animated } from 'react-native'
import { Provider } from 'react-redux'
import { createStackNavigator, createAppContainer } from 'react-navigation'

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
import ProfessionalListChatScreen from './src/screens/ProfessionalListChatScreen'
import ClientListChatScreen from './src/screens/ClientListChatScreen'
import ProfessionalCallsScreen from './src/screens/ProfessionalCallsScreen'
import ClientCallsScreen from './src/screens/ClientCallsScreen'
import CallsListScreen from './src/screens/CallsListScreen'
import ChatListScreen from './src/screens/ChatListScreen'

import store from './src/store'


const MainNavigator = createStackNavigator(
  {
    Splash: { screen: SplashScreen },
    Login: { screen: LoginScreen },
    Professionals: { screen: ProfessionalsScreen },
    CategoriesSearch: { screen: CategoriesSearchScreen },
    Perfil: { screen: PerfilScreen },
    Services: { screen: ServicesScreen },
    ProfessionalHome: { screen: ProfessionalHomeScreen },
    ProfessionalHomeView: { screen: ProfessionalHomeScreen },
    ServiceHire: { screen: ServiceHireScreen },
    ProfessionalChat: { screen: ProfessionalChatScreen },
    NewCall: { screen: NewCallScreen },
    ProfessionalListChat: { screen: ProfessionalListChatScreen },
    ClientListChat: { screen: ClientListChatScreen },
    CallsList: { screen: CallsListScreen },
    ChatList: { screen: ChatListScreen },
  },
  {
    initialRouteName: 'Splash',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const { layout, position, scene } = sceneProps;
        const { index } = scene;

        const width = layout.initWidth;
        const translateX = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [width, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return { opacity, transform: [{ translateX: translateX }] };
      },
    })
  }
);

let Navigation = createAppContainer(MainNavigator)

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}