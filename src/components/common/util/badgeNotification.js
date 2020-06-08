import React from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const updateBadge = async (msg) => {
    try {
        if (msg.type === 'call' || msg.type === 'call_finished') {
            const result = await updateCallBadge(msg)
            return result
        }
        else if (msg.type === 'rating') {
            //badge para avaliação
            return true
        }
        else {
            const result = await updateChatBadge(msg)
            return result
        }
    } catch (e) {
        console.log('updateBadge => ', e)
        return false
    }
}

const updateCallBadge = async (msg) => {
    try {
        const storageName = `@badgeCall`
        const strBadge = await AsyncStorage.getItem(storageName)
        const arrayBadgeCall = JSON.parse(strBadge)
        if (arrayBadgeCall != null) {
            const array = arrayBadgeCall.filter((item) => item.client_id != msg.client_id && item.professional_id != msg.professional_id)
            const array2 = arrayBadgeCall.filter((item) => item.client_id == msg.client_id && item.professional_id == msg.professional_id)
            if (array2.length > 0) {
                const item = {
                    client_id: msg.client_id,
                    professional_id: msg.professional_id,
                    call_id: msg.call_id,
                    badge: array2[0].badge + 1
                }
                array.push(item)
            }
            else {
                const item = {
                    client_id: msg.client_id,
                    professional_id: msg.professional_id,
                    call_id: msg.call_id,
                    badge: 1
                }
                array.push(item)
            }
            await AsyncStorage.setItem(storageName, JSON.stringify(array));
        }
        else {
            const array = []
            const item = {
                client_id: msg.client_id,
                professional_id: msg.professional_id,
                call_id: msg.call_id,
                badge: 1
            }
            array.push(item)
            await AsyncStorage.setItem(storageName, JSON.stringify(array));
        }
        
        return true        
    } catch (e) {
        console.log('erro => ', e)
        return false
    }
}

const updateChatBadge = async (msg) => {
    try {
        const storageName = `@badgeChat`
        const strBadge = await AsyncStorage.getItem(storageName)
        const arrayBadgeChat = JSON.parse(strBadge)
        if (arrayBadgeChat != null) {
            const array = arrayBadgeChat.filter((item) => item.client_id != msg.client_id && item.professional_id != msg.professional_id)
            const array2 = arrayBadgeChat.filter((item) => item.client_id == msg.client_id && item.professional_id == msg.professional_id)
            if (array2.length > 0) {
                const item = {
                    client_id: msg.client_id,
                    professional_id: msg.professional_id,
                    badge: array2[0].badge + 1
                }
                array.push(item)
            }
            else {
                const item = {
                    client_id: msg.client_id,
                    professional_id: msg.professional_id,
                    badge: 1
                }
                array.push(item)
            }
            await AsyncStorage.setItem(storageName, JSON.stringify(array));
        }
        else {
            const array = []
            const item = {
                client_id: msg.client_id,
                professional_id: msg.professional_id,
                badge: 1
            }
            array.push(item)
            await AsyncStorage.setItem(storageName, JSON.stringify(array));
        }
        
        return true
    } catch (e) {
        console.log('erro => ', e)
        return false
    }
}