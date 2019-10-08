import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* getHighlights(action) { 
    try {
        let request = yield axios.get(`${urlMyJobsAPI}/highlights/highlights.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })  
        let { highlights } = request.data   
        yield put(ActionCreator.highlightsLoadSuccess(highlights))
    } catch (ex) { 
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido' 
        yield put(ActionCreator.highlightsLoadError(messageError))
    }
} 

function* getHighlightsLoadBySubcategoryRequest(action) {  
    try {
        let request = yield axios.get(`${urlMyJobsAPI}/highlights/highlightsBySubcategory/${action.subcategory.id}.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })  
        console.log('teste = ' + request.data)

        let { highlights } = request.data   
        
        yield put(ActionCreator.highlightsLoadSuccess(highlights))
    } catch (ex) { 
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido' 
        console.log('erro = ' + messageError)
        yield put(ActionCreator.highlightsLoadError(messageError))
    }
} 

export default function* rootHighlights() { 
    console.log("chegou na saga")
    yield all([
        takeLatest(Types.HIGHLIGHTS_LOAD_REQUEST, getHighlights),
        takeLatest(Types.HIGHLIGHTS_LOAD_BY_SUBCATEGORY_REQUEST, getHighlightsLoadBySubcategoryRequest)
    ])
}