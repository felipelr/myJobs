import React, { Component } from 'react'
import { Provider } from 'react-redux'

import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'
import ProfessionalSearchScreen from './src/screens/ProfessionalSearchScreen/index'
import PerfilScreen from './src/screens/PerfilScreen/index'
import ServicesScreen from './src/screens/ServicesScreen'
import ServiceHomeScreen from './src/screens/ServiceHomeScreen'
import ProfessionalHomeScreen from './src/screens/ProfessionalHomeScreen/index'
import ServiceHireScreen from './src/screens/ServiceHireScreen'
import ProfessionalChatScreen from './src/screens/ProfessionalChatScreen/index'

import store from './src/store'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Professionals: { screen: ProfessionalsScreen },
  ProfessionalSearch: { screen: ProfessionalSearchScreen },
  Perfil: { screen: PerfilScreen },
  Services: { screen: ServicesScreen },
  ServiceHome: { screen: ServiceHomeScreen },
  ProfessionalHome: { screen: ProfessionalHomeScreen },
  ServiceHire: { screen: ServiceHireScreen },
  ProfessionalChat: { screen: ProfessionalChatScreen }
}, { initialRouteName: 'Login' });

let Navigation = createAppContainer(MainNavigator)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
} 