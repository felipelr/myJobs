import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* getHighlights(action) { 
    try {
        let request = yield axios.get(`${urlMyJobsAPI}/professionals/highlights.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })  
        let { highlights } = request.data   
        yield put(ActionCreator.highlightsLoadSuccess(highlights))
    } catch (ex) { 
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('teste erro saga')
        yield put(ActionCreator.highlightsLoadError(messageError))
    }
} 

export default function* rootHighlights() { 
    yield all([
        takeLatest(Types.HIGHLIGHTS_LOAD_REQUEST, getHighlights)
    ])
}