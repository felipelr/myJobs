import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'
import ProfessionalSearch from './src/screens/ProfessionalSearch/index'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Professionals: { screen: ProfessionalsScreen },
  ProfessionalSearch: {screen: ProfessionalSearch},
}, { initialRouteName: 'Login' }); 

const App = createAppContainer(MainNavigator);

export default App;