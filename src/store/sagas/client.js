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
        const putResp = yield axios.put(`${urlMyJobsAPI}/clients/edit/${action.client.id}.json`,
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
            const client = putResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

function* addNewClientAddress(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/clientsAddresses/add.json`,
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
            const client = postResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

function* editClientAddress(action) {
    try {
        const putResp = yield axios.put(`${urlMyJobsAPI}/clientsAddresses/edit/${action.clientAddress.id}.json`,
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

        if (putResp.data.error) {
            yield put(ActionCreator.clientUpdateError(putResp.data.errorMessage))
        }
        else {
            const client = putResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

function* deleteClientAddress(action) {
    try {
        const deleteResp = yield axios.delete(`${urlMyJobsAPI}/clientsAddresses/delete/${action.id}.json`,
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (deleteResp.data.error) {
            yield put(ActionCreator.clientUpdateError(deleteResp.data.errorMessage))
        }
        else {
            const client = deleteResp.data.client
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientUpdateError(messageError))
    }
}

function* clientNewServiceOrderRequest(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/clientsServiceOrders/add.json`,
            {
                ...action.serviceOrder
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.clientNewServiceOrderError(postResp.data.errorMessage))
        }
        else {
            const { clientsServiceOrders } = postResp.data
            yield put(ActionCreator.clientNewServiceOrderSuccess(clientsServiceOrders))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.clientNewServiceOrderError(messageError))
    }
}

export default function* rootClients() {
    yield all([
        takeLatest(Types.CLIENT_UPDATE_REQUEST, updateClient),
        takeLatest(Types.ADD_NEW_CLIENT_ADDRESS, addNewClientAddress),
        takeLatest(Types.EDIT_CLIENT_ADDRESS, editClientAddress),
        takeLatest(Types.DELETE_CLIENT_ADDRESS, deleteClientAddress),
        takeLatest(Types.CLIENT_NEW_SERVICE_ORDER_REQUEST, clientNewServiceOrderRequest),
    ])
}