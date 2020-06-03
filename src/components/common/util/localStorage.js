import AsyncStorage from '@react-native-community/async-storage'

export const saveInstaAcessTokenLong = async (token) => {
    try {
        const storageName = '@instaTokenLong'
        await AsyncStorage.setItem(storageName, token)
        console.log('saved TOKEN => ', token)
        return true
    } catch (e) {
        console.log('saveInstaAcessTokenLong => ', JSON.stringify(e))
        return false
    }
}

export const saveInstaUserID = async (id) => {
    try {
        const storageName = '@instaUserID'
        await AsyncStorage.setItem(storageName, id.toString())
        return true
    } catch (e) {
        console.log('saveInstaUserID => ', JSON.stringify(e))
        return false
    }
}