import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuth: false,
    isLogingin: false,
    isUpdating: false,
    user: {},
    error: false,
    errorMessage: '',
    token: '',
    userType: 'client',
    instaTokenLong: '',
    instaUserID: '',
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
        token: action.data.token,
        userType: action.data.userType
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

export const loginCleanError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: ''
    }
}

export const logoutRequest = (state = INITIAL_STATE, action) => {
    return state
}

export const logoutSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuth: false,
        user: {},
        token: '',
        userType: 'client'
    }
}

export const authSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isAuth: true,
        isLogingin: false,
        user: action.data.user,
        token: action.data.token,
        userType: action.data.userType
    }
}

export const changePasswordRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        error: false,
        errorMessage: ''
    }
}

export const changePasswordSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        error: false,
        errorMessage: ''
    }
}

export const changePasswordError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        error: true,
        errorMessage: action.error
    }
}

export const authCleanErrors = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: ''
    }
}

export const authSetUserType = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        userType: action.userType
    }
}

export const authSetInstaTokenLong = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        instaTokenLong: action.token
    }
}

export const authSetInstaUserId = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        instaUserID: action.id
    }
}

export const HANDLERS = {
    [Types.LOGIN_REQUEST]: loginRequest,
    [Types.LOGIN_SUCCESS]: loginSuccess,
    [Types.LOGIN_ERROR]: loginError,
    [Types.LOGIN_CLEAN_ERROR]: loginCleanError,
    [Types.LOGOUT_REQUEST]: logoutRequest,
    [Types.LOGOUT_SUCCESS]: logoutSuccess,
    [Types.AUTH_SUCCESS]: authSuccess,
    [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
    [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
    [Types.CHANGE_PASSWORD_ERROR]: changePasswordError,
    [Types.AUTH_CLEAN_ERRORS]: authCleanErrors,
    [Types.AUTH_SET_USER_TYPE]: authSetUserType,
    [Types.AUTH_SET_INSTA_TOKEN_LONG]: authSetInstaTokenLong,
    [Types.AUTH_SET_INSTA_USER_ID]: authSetInstaUserId,
}

export default createReducer(INITIAL_STATE, HANDLERS)