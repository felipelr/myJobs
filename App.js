import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'
import ProfessionalSearchScreen from './src/screens/ProfessionalSearchScreen/index'
import PerfilScreen from './src/screens/PerfilScreen/index'
import ServicesScreen from './src/screens/ServicesScreen'
import ProfessionalHomeScreen from './src/screens/ProfessionalHomeScreen/index'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Professionals: { screen: ProfessionalsScreen },
  ProfessionalSearch: { screen: ProfessionalSearchScreen },
  Perfil: { screen: PerfilScreen },
  Services: { screen: ServicesScreen },
  ProfessionalHome: {screen: ProfessionalHomeScreen}
}, { initialRouteName: 'ProfessionalHome' });

const App = createAppContainer(MainNavigator);

export default App;