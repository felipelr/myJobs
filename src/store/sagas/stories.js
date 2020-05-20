import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* storiesSaveRequest(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/stories/add.json`,
            {
                ...action.story
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.storiesSaveError(postResp.data.errorMessage))
        }
        else {
            const { story } = postResp.data
            yield put(ActionCreator.storiesSaveSuccess(story))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.storiesSaveError(messageError))
    }
} 

function* storiesSaveIntragramData(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/instagram/add.json`,
            {
                ...action.story
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.storiesSaveError(postResp.data.errorMessage))
        }
        else {
            yield put(ActionCreator.storiesSaveIntragramDataSuccess())
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.storiesSaveError(messageError))
    }
}

export default function* rootProfessionals() {
    yield all([
        takeLatest(Types.STORIES_SAVE_REQUEST, storiesSaveRequest),
        takeLatest(Types.STORIES_SAVE_INTRAGRAM_DATA, storiesSaveIntragramData),
    ])
}