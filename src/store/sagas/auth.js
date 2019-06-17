import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

setUserData = async (userData) => {
    try {
        await AsyncStorage.setItem('@userData', JSON.stringify(userData))
    } catch (e) {
        console.log(e)
    }
}

function* login(action) {
    try {
        let login = yield axios.post(`${urlMyJobsAPI}/users/login.json`, {
            email: action.email,
            password: action.password
        })

        let { data } = login.data
        token = data.token
        let user = jwtDecode(token)

        //salvar token
        let userData = { user, token }
        setUserData(userData)

        yield put(ActionCreator.loginSuccess({ user, token }))
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.loginError(messageError))
    }
}

function* auth(action) {
    try {
        let userData = yield AsyncStorage.getItem('@userData')
        if (userData) {
            let parsed = JSON.parse(userData)
            yield put(ActionCreator.authSuccess(parsed))
        }
        else {
            yield put(ActionCreator.authError())
        }
    } catch (ex) {
        yield put(ActionCreator.authError())
    }
}

function* logout(action){
    try {
        yield AsyncStorage.removeItem('@userData')    
        yield put(ActionCreator.logoutSuccess())    
    } catch (ex) {
        yield put(ActionCreator.logoutError(ex.message))
    }
}

export default function* rootAuth() {
    console.log('rootAuth')
    yield all([
        takeLatest(Types.LOGIN_REQUEST, login),
        takeLatest(Types.AUTH_REQUEST, auth),
        takeLatest(Types.LOGOUT_REQUEST, logout)
    ])
}