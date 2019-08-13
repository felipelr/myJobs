import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isSigningup: false,
    isSignup: false,
    user: {},
    error: false,
    errorMessage: ''
}

export const socialMidiaSignupInit = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningup: false,
        isSignup: false,
        user: action.user,
        error: false,
        errorMessage: ''
    }
}

export const HANDLERS = {
    [Types.SOCIAL_MIDIA_SIGNUP_INIT]: socialMidiaSignupInit
}

export default createReducer(INITIAL_STATE, HANDLERS)