import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isSigningUp: false,
    user: {},
    error: false,
    errorMessage: '',
}

export const signupRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningUp: true,
        error: false,
        errorMessage: ''
    }
}

export const signupSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningUp: false,
        user: action.data.user,
    }
}

export const signupError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningUp: false,
        error: true,
        errorMessage: action.error,
        user: {}
    }
}

export const HANDLERS = {
    [Types.SIGNUP_REQUEST]: signupRequest,
    [Types.SIGNUP_SUCCESS]: signupSuccess,
    [Types.SIGNUP_ERROR]: signupError
}

export default createReducer(INITIAL_STATE, HANDLERS)