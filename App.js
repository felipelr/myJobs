import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen/index'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen }
}, { initialRouteName: 'Login' });

const App = createAppContainer(MainNavigator);

export default App;