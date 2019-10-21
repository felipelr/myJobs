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
            yield put(ActionCreator.clientUpdateError(putResp.data.errorMessage))
        }
        else {
            let client = putResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

function* addNewClientAddress(action){
    try {
        let postResp = yield axios.post(`${urlMyJobsAPI}/clientsAddresses/add.json`,
            {
                ...action.clientAddress
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.clientUpdateError(postResp.data.errorMessage))
        }
        else {
            let client = postResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

export default function* rootClients() {
    yield all([
        takeLatest(Types.CLIENT_UPDATE_REQUEST, updateClient),
        takeLatest(Types.ADD_NEW_CLIENT_ADDRESS, addNewClientAddress),
    ])
}