import { put, takeLatest, all } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'

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

setClientData = async (clientData) => {
    try {
        await AsyncStorage.setItem('@clientData', JSON.stringify(clientData))
    } catch (e) {
        console.log(e)
    }
}

setProfessionalData = async (professionalData) => {
    try {
        await AsyncStorage.setItem('@professionalData', JSON.stringify(professionalData))
    } catch (e) {
        console.log(e)
    }
}

function* login(action) {
    try {
        const login = yield axios.post(`${urlMyJobsAPI}/users/login.json`, {
            email: action.email,
            password: action.password
        })

        const { data } = login.data
        token = data.token
        const user = jwtDecode(token)

        //salvar token
        const userData = { user, token }
        setUserData(userData)

        let view = yield axios.get(`${urlMyJobsAPI}/users/view/${user.sub}.json`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })

        const { client } = view.data.user
        const { professional } = view.data.user

        if (client) {
            setClientData(client)
            yield put(ActionCreator.clientUpdateSuccess(client))
        }

        if (professional) {
            setProfessionalData(professional)
            yield put(ActionCreator.professionalUpdateSuccess(client))
        }

        yield put(ActionCreator.loginSuccess({ user, token }))
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.loginError(messageError))
    }
}

function* auth(action) {
    try {
        const userData = yield AsyncStorage.getItem('@userData')
        if (userData) {
            const clientData = yield AsyncStorage.getItem('@clientData')
            if (clientData) {
                yield put(ActionCreator.clientUpdateSuccess(JSON.parse(clientData)))
            }

            const professionalData = yield AsyncStorage.getItem('@professionalData')
            if (professionalData) {
                yield put(ActionCreator.professionalUpdateSuccess(JSON.parse(professionalData)))
            }

            yield put(ActionCreator.authSuccess(JSON.parse(userData)))
        }
        else {
            yield put(ActionCreator.authError())
        }
    } catch (ex) {
        yield put(ActionCreator.authError())
    }
}

function* logout(action) {
    try {
        yield AsyncStorage.removeItem('@userData')
        yield AsyncStorage.removeItem('@clientData')
        yield AsyncStorage.removeItem('@professionalData')
        yield put(ActionCreator.logoutSuccess())
    } catch (ex) {
        yield put(ActionCreator.logoutError(ex.message))
    }
}

function* changePassword(action) {
    try {
        const postRequest = yield axios.post(`${urlMyJobsAPI}/users/change_password.json`,
            {
                id: action.user.id,
                currentPassword: action.currentPassword,
                newPassword: action.newPassword,
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            })

        const { data } = postRequest
        if (data.error) {
            yield put(ActionCreator.changePasswordError(data.errorMessage))
        }
        else {
            yield put(ActionCreator.changePasswordSuccess())
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.changePasswordError(messageError))
    }
}

export default function* rootAuth() {
    yield all([
        takeLatest(Types.LOGIN_REQUEST, login),
        takeLatest(Types.AUTH_REQUEST, auth),
        takeLatest(Types.LOGOUT_REQUEST, logout),
        takeLatest(Types.CHANGE_PASSWORD_REQUEST, changePassword),
    ])
}