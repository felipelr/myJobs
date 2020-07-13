import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

import LoginScreen from './screens/LoginScreen/index'
import ProfessionalsScreen from './screens/ProfessionalsScreen/index'
import CategoriesSearchScreen from './screens/CategoriesSearchScreen/index'
import PerfilScreen from './screens/PerfilScreen/index'
import ServicesScreen from './screens/ServicesScreen'
import ProfessionalHomeScreen from './screens/ProfessionalHomeScreen/index'
import ServiceHireScreen from './screens/ServiceHireScreen'
import ProfessionalChatScreen from './screens/ProfessionalChatScreen/index'
import SplashScreen from './screens/SplashScreen'
import NewCallScreen from './screens/NewCallScreen'
import ProfessionalListChatScreen from './screens/ProfessionalListChatScreen'
import ClientListChatScreen from './screens/ClientListChatScreen'
import CallsListScreen from './screens/CallsListScreen'
import ChatListScreen from './screens/ChatListScreen'
import ProfessionalViewScreen from './screens/ProfessionalViewScreen'
import FavoritiesScreen from './screens/FavoritiesScreen'

const Stack = createStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                headerMode="none"
                screenOptions={{
                    gestureEnabled: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Professionals" component={ProfessionalsScreen} />
                <Stack.Screen name="CategoriesSearch" component={CategoriesSearchScreen} />
                <Stack.Screen name="Perfil" component={PerfilScreen} />
                <Stack.Screen name="Services" component={ServicesScreen} />
                <Stack.Screen name="ProfessionalHome" component={ProfessionalHomeScreen} />
                <Stack.Screen name="ProfessionalHomeView" component={ProfessionalHomeScreen} />
                <Stack.Screen name="ServiceHire" component={ServiceHireScreen} />
                <Stack.Screen name="ProfessionalChat" component={ProfessionalChatScreen} />
                <Stack.Screen name="NewCall" component={NewCallScreen} />
                <Stack.Screen name="ProfessionalListChat" component={ProfessionalListChatScreen} />
                <Stack.Screen name="ClientListChat" component={ClientListChatScreen} />
                <Stack.Screen name="CallsList" component={CallsListScreen} />
                <Stack.Screen name="ChatList" component={ChatListScreen} />
                <Stack.Screen name="ProfessionalView" component={ProfessionalViewScreen} />
                <Stack.Screen name="Favorite" component={FavoritiesScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;