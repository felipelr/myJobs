import { purple } from '../util/colors'
var PushNotification = require("react-native-push-notification")

export const showNotification = (notification) => {
    PushNotification.localNotification({
        /* Android Only Properties */
        autoCancel: true, // (optional) default: true
        largeIcon: "ic_myjobs", // (optional) default: "ic_launcher"
        smallIcon: "ic_myjobs", // (optional) default: "ic_notification" with fallback for "ic_launcher"
        color: purple, // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        priority: "high", // (optional) set notification priority, default: high
        visibility: "private", // (optional) set notification visibility, default: private
        importance: "high", // (optional) set notification importance, default: high
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

        /* iOS and Android properties */
        title: notification.title, // (optional)
        message: notification.body, // (required)
        data: notification.data,
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)                
    });
}