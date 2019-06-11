import { put } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'

function* login(action) {

    const login = yield axios.post('http://myjobs.servicos.ws/api/users/login.json', {
        email: action.email,
        password: action.password
    })

    if (login.data.data.token) {
        token = login.data.data.token
        const user = jwtDecode(token)
        yield put(ActionCreator.loginSuccess({ user, token }))
    }
    else {
        const messageError = login.data.message ? login.data.message : 'Erro Desconhecido'
        yield put(ActionCreator.loginError(messageError))
    }
}

export default function* rootAuth() {
    yield all([
        takeLatest(Types.LOGIN_REQUEST, login)
    ])
}