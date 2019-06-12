import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* login(action) {
    try {
        const login = yield axios.post(`${urlMyJobsAPI}/users/login.json`, {
            email: action.email,
            password: action.password
        })

        const { data } = login.data
        token = data.token
        const user = jwtDecode(token)
        yield put(ActionCreator.loginSuccess({ user, token }))
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.loginError(messageError))
    }
}

export default function* rootAuth() {
    console.log('rootAuth')
    yield all([
        takeLatest(Types.LOGIN_REQUEST, login)
    ])
}