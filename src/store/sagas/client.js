import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* updateClient(action) {
    console.log(action)
    try {
        let data = yield axios.put(`${urlMyJobsAPI}/clients/edit/${action.client.id}.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            },
            ...action.client
        })
        console.log(data)
        let client = data.data.client

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