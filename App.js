import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry, StatusBar } from 'react-native';
import messaging from '@react-native-firebase/messaging';

import store from './src/store'
import Routes from './src/routes'
import { updateBadge } from './src/components/common/util/badgeNotification'
import { purple } from './src/components/common/util/colors'

export default function App() {

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    const data = remoteMessage.data

    let jsonMessage = null
    if (data.message)
      jsonMessage = typeof data.message == 'string' ? JSON.parse(data.message) : data.message

    //salvar badge do chat ou call
    updateBadge(jsonMessage)
  });

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