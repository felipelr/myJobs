import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isSigningup: false,
    isSignup: false,
    newUser: {},
    user: {},
    error: false,
    errorMessage: '',
    socialMidiaId: '',
    socialMidiaType: '',
    verifyingAcc: false,
    accVerified: -1
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

export const socialMidiaSignupRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningup: true,
        isSignup: false,
        newUser: {},
        error: false,
        errorMessage: ''
    }
}

export const socialMidiaSignupSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningup: false,
        isSignup: true,
        newUser: action.newUser,
    }
}

export const socialMidiaSignupError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningup: false,
        isSignup: false,
        error: true,
        errorMessage: action.error,
        newUser: {}
    }
}

export const socialMidiaVerifyAccount = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        socialMidiaId: action.socialMidiaId,
        socialMidiaType: action.socialMidiaType,
        verifyingAcc: true,
        accVerified: -1
    }
}

export const HANDLERS = {
    [Types.SOCIAL_MIDIA_SIGNUP_INIT]: socialMidiaSignupInit,
    [Types.SOCIAL_MIDIA_SIGNUP_REQUEST]: socialMidiaSignupRequest,
    [Types.SOCIAL_MIDIA_SIGNUP_SUCCESS]: socialMidiaSignupSuccess,
    [Types.SOCIAL_MIDIA_SIGNUP_ERROR]: socialMidiaSignupError,
    [Types.SOCIAL_MIDIA_VERIFY_ACCOUNT]: socialMidiaVerifyAccount,
}

export default createReducer(INITIAL_STATE, HANDLERS)