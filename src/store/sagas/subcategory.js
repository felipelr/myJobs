import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* getSubCategoriesByCategory(action) {
    try {
        let request = yield axios.get(`${urlMyJobsAPI}/subcategorias/${action.categoryID}.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        }) 
        let { subcategories } = request.data  

        yield put(ActionCreator.subcategoriasLoadSuccess(subcategories))
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.subcategoriasLoadError(messageError))
    }
}

export default function* rootCategories() {
    yield all([
        takeLatest(Types.SUBCATEGORIAS_LOAD_REQUEST, getSubCategoriesByCategory)
    ])
}