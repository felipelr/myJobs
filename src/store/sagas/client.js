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
        let putResp = yield axios.put(`${urlMyJobsAPI}/clients/edit/${action.client.id}.json`,
            {
                ...action.client
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (putResp.data.error) {
            console.log(putResp.data.errorMessage)
            yield put(ActionCreator.clientUpdateError(putResp.data.errorMessage))
        }
        else {
            console.log(putResp.data)
            let client = putResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log(messageError)
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

export default function* rootClients() {
    yield all([
        takeLatest(Types.CLIENT_UPDATE_REQUEST, updateClient),
    ])
}