import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuthing: false,
    isAuth: false,
    isLogingin: false,
    user: {},
    error: false,
    errorMessage: '',
    token: ''
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
        user: action.user,
        token: action.token
    }
}

export const loginError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLogingin: false,
        error: true,
        errorMessage: action.error,
        user: {},
        token: ''
    }
}

export const HANDLERS = {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_ERROR]: loginError
}

export default createReducer(INITIAL_STATE, HANDLERS)