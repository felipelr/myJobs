import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuth: false,
    isLogingin: false,
    user: {},
    error: false,
    errorMessage: '',
    token: '',
    authMessage: ''
}

export const loginRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLogingin: true,
        error: false,
        errorMessage: ''
    }
}

export const loginSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLogingin: false,
        isAuth: true,
        user: action.data.user,
        token: action.data.token
    }
}

export const loginError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuth: false,
        isLogingin: false,
        error: true,
        errorMessage: action.error,
        user: {},
        token: ''
    }
}

export const authRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLogingin: true,
        authMessage: ''
    }
}

export const authSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLogingin: false,
        isAuth: true,
        user: action.data.user,
        token: action.data.token,
        authMessage: 'success'
    }
}

export const authError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLogingin: false,
        isAuth: false,
        user: {},
        token: '',
        authMessage: 'error'
    }
}

export const HANDLERS = {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_ERROR]: loginError,
    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.AUTH_ERROR]: authError
}

export default createReducer(INITIAL_STATE, HANDLERS)