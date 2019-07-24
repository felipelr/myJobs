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
        console.log(action.user)

        let signup = yield axios.post(`${urlMyJobsAPI}/users/add.json`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                userType: action.user.userType,
                email: action.user.email,
                password: action.user.password,
                name: action.user.name,
                phone: action.user.phone,
                document: action.user.document,
                date_birth: action.user.date_birth,
                genre: action.user.genre
            }
        })

        let { data } = signup.data

        console.log(data)

        yield put(ActionCreator.signupSuccess(data))
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('Servidor: ' + messageError)
        yield put(ActionCreator.signupError(messageError))
    }
}

export default function* rootSignup() {
    yield all([
        takeLatest(Types.SIGNUP_REQUEST, signup)
    ])
}