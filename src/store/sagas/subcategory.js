import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* getSubCategoriesByCategory(action) { 
    try {
        let request = yield axios.get(`${urlMyJobsAPI}/subcategories/view/${action.category.id}.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        }) 
        let { subcategories } = request.data   
        yield put(ActionCreator.subcategoriesLoadSuccess(subcategories))
    } catch (ex) { 
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.subcategoriesLoadError(messageError))
    }
}

export default function* rootSubCategories() { 
    yield all([
        takeLatest(Types.SUBCATEGORIES_BY_CATEGORY_REQUEST, getSubCategoriesByCategory)
    ])
}