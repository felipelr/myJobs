import { createStackNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen/index'
import ProfessionalsScreen from './src/screens/ProfessionalsScreen/index'
import ProfessionalSearchScreen from './src/screens/ProfessionalSearchScreen/index'
import PerfilScreen from './src/screens/PerfilScreen/index'
import ServicesScreen from './src/screens/ServicesScreen'
import ServiceHomeScreen from './src/screens/ServiceHomeScreen'
import ProfessionalHomeScreen from './src/screens/ProfessionalHomeScreen/index'

const MainNavigator = createStackNavigator({
  Login: { screen: LoginScreen },
  Professionals: { screen: ProfessionalsScreen },
  ProfessionalSearch: { screen: ProfessionalSearchScreen },
  Perfil: { screen: PerfilScreen },
  Services: { screen: ServicesScreen },
  ServiceHome: { screen: ServiceHomeScreen },
  ProfessionalHome: { screen: ProfessionalHomeScreen }
}, { initialRouteName: 'Login' });

const App = createAppContainer(MainNavigator);

export default App;