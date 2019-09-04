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
        isAuth: true,
        isLogingin: false,
        user: action.data.user,
        token: action.data.token
    }
}

export const loginError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuth: false,
        isLogingin: false,
        user: {},
        token: '',
        error: true,
        errorMessage: action.error
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
        isAuth: true,
        isLogingin: false,
        user: action.data.user,
        token: action.data.token,
        authMessage: 'success'
    }
}

export const authError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuth: false,
        isLogingin: false,
        user: {},
        token: '',
        authMessage: 'error'
    }
}

export const loginCleanError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: ''
    }
}

export const logoutRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: ''
    }
}

export const logoutSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuth: false,
        error: false,
        errorMessage: ''
    }
}

export const logoutError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        errorMessage: action.error
    }
}

export const HANDLERS = {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_ERROR]: loginError,
    [Types.LOGIN_CLEAN_ERROR]: loginCleanError,
    [Types.AUTH_REQUEST]: authRequest,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.AUTH_ERROR]: authError,
    [Types.LOGOUT_REQUEST]: logoutRequest,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
    [Types.LOGOUT_ERROR]: logoutError
}

export default createReducer(INITIAL_STATE, HANDLERS)