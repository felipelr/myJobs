import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'

function* getCategories(action) {
    try {
        let data = yield axios.post('http://myjobs.servicos.ws/api/categories', {
            headers:{
                Authorization: 'Bearer '+ action.token
            }
        })

        console.log(JSON.stringify(data));

        //yield put(ActionCreator.loginSuccess({ user, token }))
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.loginError(messageError))
    }
}

export default function* rootCategories() {
    console.log('rootCategories')
    yield all([
        takeLatest(Types.CATEGORIES_LOAD_REQUEST, getCategories)
    ])
}