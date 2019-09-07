import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

setClientData = async (clientData) => {
    try {
        await AsyncStorage.setItem('@clientData', JSON.stringify(clientData))
    } catch (e) {
        console.log(e)
    }
}

function* updateClient(action) {
    try {
        let data = yield axios.post(`${urlMyJobsAPI}/clients/edit/${action.client.id}.json`,
            {
                ...action.client
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token
                }
            })
        let client = data.data.client
        setClientData(client)

        yield put(ActionCreator.clientUpdateSuccess(client))
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log(messageError)
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

export default function* rootClients() {
    yield all([
        takeLatest(Types.CLIENT_UPDATE_REQUEST, updateClient)
    ])
}