import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* updateClient(action) {
    try {
        let data = yield axios.put(`${urlMyJobsAPI}/client/edit.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })
        let { data } = data
        let client = {}

        yield put(ActionCreator.clientUpdateSuccess(client))
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

export default function* rootClients() {
    yield all([
        takeLatest(Types.CLIENT_UPDATE_REQUEST, updateClient)
    ])
}