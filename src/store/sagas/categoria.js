import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* getCategories(action) {
    try {
        let data = yield axios.get(`${urlMyJobsAPI}/categories/index.json`, {
            headers: {
                Authorization: 'Bearer ' + action.token
            }
        }) 
        let { categories } = data.data  

        yield put(ActionCreator.categoriasLoadSuccess(categories))
    } catch (ex) {
        console.log('xabuzao = ' + JSON.stringify(ex))
    }
}

export default function* rootCategories() {
    yield all([
        takeLatest(Types.CATEGORIAS_LOAD_REQUEST, getCategories)
    ])
}