import AsyncStorage from '@react-native-community/async-storage'

export const getUserData = async () => {
    try {
        const userData = await AsyncStorage.getItem('@userData')
        if (userData) {
            const clientData = await AsyncStorage.getItem('@clientData')
            const professionalData = await AsyncStorage.getItem('@professionalData')

            let userType = professionalData ? 2 : 1

            const userJson = { ...JSON.parse(userData), userType }
            const clientJson = clientData ? JSON.parse(clientData) : null
            const professionalJson = professionalData ? JSON.parse(professionalData) : null

            return ["success", userJson, clientJson, professionalJson]
        }
        return ['error']
    } catch (e) {
        return ['error']
    }
}

export const logout = async() => {
    try {
        await AsyncStorage.removeItem('@userData')
        await AsyncStorage.removeItem('@clientData')
        await AsyncStorage.removeItem('@professionalData')        
        return "success"
    } catch (ex) {
        return ex.message
    }
}