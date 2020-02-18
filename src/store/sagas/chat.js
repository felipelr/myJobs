import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

const saveToLocalMessages = async (message) => {
    try {
        const storageName = `@savedMessages_client_${message.client_id}_professional_${message.professional_id}`
        await AsyncStorage.getItem(storageName, (err, result) => {
            const newMessage = [message]
            if (result !== null) {
                const arrayMessages = JSON.parse(result).concat(newMessage)
                AsyncStorage.setItem(storageName, JSON.stringify(arrayMessages))
            } else {
                AsyncStorage.setItem(storageName, JSON.stringify(newMessage))
            }
        })
    } catch (e) {
        console.log(e)
    }
}

function* chatSendNewMessage(action) {
    try {
        const postReq = yield axios.post(`${urlMyJobsAPI}/chatMessages/add.json`,
            {
                client_id: action.message.client_id,
                professional_id: action.message.professional_id,
                message: action.message.message,
                date_time: action.message.date_time,
                msg_from: action.message.msg_from,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

        console.log('chatSendNewMessage => ', postReq.data)

        if (postReq.data.error) {
            yield put(ActionCreator.chatSendNewMessageError(postReq.data.errorMessage))
        }
        else {
            saveToLocalMessages(postReq.data.message)
            yield put(ActionCreator.chatSendNewMessageSuccess(postReq.data.message))
        }

    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('Servidor: ' + messageError)
        yield put(ActionCreator.chatSendNewMessageError(messageError))
    }
}

function* chatUpdateUserFcmToken(action) {
    try {
        const postReq = yield axios.post(`${urlMyJobsAPI}/users/updateFcmToken.json`,
            {
                user_id: action.userId,
                fcm_token: action.fcmToken,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

        if (postReq.data.success) {
            console.log('FCM Token alterado')
        }
        else {
            console.log('FCM Token NÂO alterado => ', postReq.data.errorMessage)
        }

    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('Servidor: ' + messageError)
    }
}

export default function* rootChat() {
    yield all([
        takeLatest(Types.CHAT_SEND_NEW_MESSAGE, chatSendNewMessage),
        takeLatest(Types.CHAT_UPDATE_USER_FCM_TOKEN, chatUpdateUserFcmToken),
    ])
}