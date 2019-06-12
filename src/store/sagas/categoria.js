import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* getCategories(action) {
    try {
        let data = yield axios.post(`${urlMyJobsAPI}/categories/index.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        })

        console.log(JSON.stringify(data))

        yield put(ActionCreator.categoriasLoadSuccess(data))
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.categoriasLoadError(messageError))
    }
}

export default function* rootCategories() {
    console.log('rootCategories')
    yield all([
        takeLatest(Types.CATEGORIAS_LOAD_REQUEST, getCategories)
    ])
}