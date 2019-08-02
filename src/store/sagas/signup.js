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
        let signup = yield axios.post(`${urlMyJobsAPI}/users/add.json`, {
            userType: action.user.userType,
            email: action.user.email,
            password: action.user.password,
            name: action.user.name,
            phone: action.user.phone,
            document: action.user.document,
            date_birth: action.user.date_birth,
            genre: action.user.genre,
            latitude: action.user.latitude,
            longitude: action.user.longitude,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        if (signup.data.error) {
            console.log(signup.data.errorMessage)
            yield put(ActionCreator.signupError(signup.data.errorMessage))
        }
        else {
            let user = signup.data.newUser
            yield put(ActionCreator.signupSuccess(user))
        }

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