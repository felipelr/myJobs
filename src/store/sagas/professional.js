import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* sendNewSuggest(action) {
    try {
        let postResp = yield axios.post(`${urlMyJobsAPI}/professionals/new_suggest.json`,
            {
                ...action.data
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.professionalsSendNewSuggestError(postResp.data.errorMessage))
        }
        else {
            yield put(ActionCreator.professionalsSendNewSuggestSuccess())
        }
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalsSendNewSuggestError(messageError))
    }
}

export default function* rootProfessionals() {
    yield all([
        takeLatest(Types.PROFESSIONALS_SEND_NEW_SUGGEST, sendNewSuggest),
    ])
}