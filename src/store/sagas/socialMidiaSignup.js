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
        let signup = null
        if (action.user.facebook_id) {
            signup = yield axios.post(`${urlMyJobsAPI}/users/add.json`, {
                userType: action.user.userType,
                email: action.user.email,
                password: action.user.password,
                name: action.user.name,
                phone: action.user.phone,
                document: action.user.document,
                date_birth: action.user.date_birth,
                gender: action.user.gender,
                latitude: action.user.latitude,
                longitude: action.user.longitude,
                facebook_id: action.user.facebook_id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }
        else if (action.user.google_id) {
            signup = yield axios.post(`${urlMyJobsAPI}/users/add.json`, {
                userType: action.user.userType,
                email: action.user.email,
                password: action.user.password,
                name: action.user.name,
                phone: action.user.phone,
                document: action.user.document,
                date_birth: action.user.date_birth,
                gender: action.user.gender,
                latitude: action.user.latitude,
                longitude: action.user.longitude,
                google_id: action.user.google_id,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
        }

        if (signup.data.error) {
            console.log(signup.data.errorMessage)
            yield put(ActionCreator.socialMidiaSignupError(signup.data.errorMessage))
        }
        else {
            let user = signup.data.newUser
            user.password = action.user.password
            user.email = action.user.email
            yield put(ActionCreator.socialMidiaSignupSuccess(user))
        }

    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('Servidor: ' + messageError)
        yield put(ActionCreator.socialMidiaSignupError(messageError))
    }
}

function* verifyAccount(action) {
    try {
        let resposta = yield axios.post(`${urlMyJobsAPI}/users/social_midia_verify.json`, {
            socialMidiaId: action.socialMidiaId,
            socialMidiaType: action.socialMidiaType,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })

        if (resposta.data.error) {
            console.log(resposta.data.errorMessage)
            yield put(ActionCreator.socialMidiaVerifyError(resposta.data.errorMessage))
        }
        else {
            let user = resposta.data.user
            user.email = user.user.email
            user.password = action.socialMidiaId
            yield put(ActionCreator.socialMidiaVerifySuccess(user))
        }
    }
    catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('Servidor: ' + messageError)
    }
}

export default function* rootSignup() {
    yield all([
        takeLatest(Types.SOCIAL_MIDIA_SIGNUP_REQUEST, signup),
        takeLatest(Types.SOCIAL_MIDIA_VERIFY_ACCOUNT, verifyAccount),
    ])
}