import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* serviceNewSuggestion(action) {
    try {
        const postReq = yield axios.post(`${urlMyJobsAPI}/serviceSuggestions/new.json`,
            {
                ...action.serviceSuggestion
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

        console.log('serviceNewSuggestion => ', postReq.data)

        if (postReq.data.error) {
            yield put(ActionCreator.serviceNewSuggestionError(postReq.data.errorMessage))
        }
        else {
            yield put(ActionCreator.serviceNewSuggestionSuccess(postReq.data.message))
        }

    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('Servidor: ' + messageError)
        yield put(ActionCreator.serviceNewSuggestionError(messageError))
    }
}

export default function* rootChat() {
    yield all([
        takeLatest(Types.SERVICE_NEW_SUGGESTION, serviceNewSuggestion),
    ])
}