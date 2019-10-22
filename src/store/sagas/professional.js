import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

setProfessionalData = async (professionalData) => {
    try {
        await AsyncStorage.setItem('@professionalData', JSON.stringify(professionalData))
    } catch (e) {
        console.log(e)
    }
}

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

function* updateProfessional(action) {
    try {
        const putResp = yield axios.put(`${urlMyJobsAPI}/professionals/edit/${action.professional.id}.json`,
            {
                ...action.professional
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (putResp.data.error) {
            yield put(ActionCreator.professionalUpdateError(putResp.data.errorMessage))
        }
        else {
            const professional = putResp.data.professional
            setProfessionalData(professional)
            yield put(ActionCreator.professionalUpdateSuccess(professional))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalUpdateError(messageError))
    }
}

export default function* rootProfessionals() {
    yield all([
        takeLatest(Types.PROFESSIONALS_SEND_NEW_SUGGEST, sendNewSuggest),
        takeLatest(Types.PROFESSIONAL_UPDATE_REQUEST, updateProfessional),
    ])
}