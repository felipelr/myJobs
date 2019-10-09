import AsyncStorage from '@react-native-community/async-storage'

export const logout = async() => {
    try {
        await AsyncStorage.removeItem('@userData')
        await AsyncStorage.removeItem('@clientData')
        await AsyncStorage.removeItem('@professionalData')        
        return ""
    } catch (ex) {
        return ex.message
    }
}