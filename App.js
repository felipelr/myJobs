import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Professionals: { screen: ProfessionalsScreen }
}, { initialRouteName: 'Professionals' }); 

const App = createAppContainer(MainNavigator);

export default App;