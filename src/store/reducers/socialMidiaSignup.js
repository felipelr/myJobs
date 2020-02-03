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
        user: action.user,
        isSigningup: false,
        isSignup: false,
        newUser: {},
        error: false,
        errorMessage: '',
        socialMidiaId: '',
        socialMidiaType: '',
        accVerified: false,
        accVerified: -1
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

export const socialMidiaVerifySuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        verifyingAcc: false,
        accVerified: 1,
        user: action.user,
    }
}

export const socialMidiaVerifyError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        verifyingAcc: false,
        accVerified: 0,
    }
}

export const HANDLERS = {
    [Types.SOCIAL_MIDIA_SIGNUP_INIT]: socialMidiaSignupInit,
    [Types.SOCIAL_MIDIA_SIGNUP_REQUEST]: socialMidiaSignupRequest,
    [Types.SOCIAL_MIDIA_SIGNUP_SUCCESS]: socialMidiaSignupSuccess,
    [Types.SOCIAL_MIDIA_SIGNUP_ERROR]: socialMidiaSignupError,
    [Types.SOCIAL_MIDIA_VERIFY_ACCOUNT]: socialMidiaVerifyAccount,
    [Types.SOCIAL_MIDIA_VERIFY_SUCCESS]: socialMidiaVerifySuccess,
    [Types.SOCIAL_MIDIA_VERIFY_ERROR]: socialMidiaVerifyError,
}

export default createReducer(INITIAL_STATE, HANDLERS)