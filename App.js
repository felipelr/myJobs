import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, StatusBar } from 'react-native'

import store from './src/store'
import Routes from './src/routes'

import { purple } from './src/components/common/util/colors'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={purple} />
      <Routes />
    </Provider>
  )
}

AppRegistry.registerComponent('app', () => App);