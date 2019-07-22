import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
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

function* signup(action) {
    try {
        let signup = yield axios.post(`${urlMyJobsAPI}/users/signup.json`, {
            user: action.user
        })

        let { data } = signup.data

        console.log(data)

        yield put(ActionCreator.signupSuccess(data))
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.signupError(messageError))
    }
}

export default function* rootAuth() {
    yield all([
        takeLatest(Types.SIGNUP_REQUEST, signup)
    ])
}