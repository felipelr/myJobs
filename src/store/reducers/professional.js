import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    professionals: [],
    error: false,
    errorMessage: '',
}

export const professionalsLoadRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const professionalsLoadSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        professionals: action.professionals,
        loading: false
    }
}

export const professionalsLoadError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.error
    }
}

export const professionalsCleanErrors = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: ''
    }
}

export const professionalsSendNewSuggest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const professionalsSendNewSuggestSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: ''
    }
}

export const professionalsSendNewSuggestError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
    }
}

export const HANDLES = {
    [Types.PROFESSIONALS_LOAD_REQUEST]: professionalsLoadRequest,
    [Types.PROFESSIONALS_LOAD_SUCCESS]: professionalsLoadSuccess,
    [Types.PROFESSIONALS_LOAD_ERROR]: professionalsLoadError,
    [Types.PROFESSIONALS_CLEAN_ERRORS]: professionalsCleanErrors,
    [Types.PROFESSIONALS_SEND_NEW_SUGGEST]: professionalsSendNewSuggest,
    [Types.PROFESSIONALS_SEND_NEW_SUGGEST_SUCCESS]: professionalsSendNewSuggestSuccess,
    [Types.PROFESSIONALS_SEND_NEW_SUGGEST_ERROR]: professionalsSendNewSuggestError,
}

export default createReducer(INITIAL_STATE, HANDLES)