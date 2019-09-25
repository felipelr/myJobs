import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    professionals: [],
    error: false,
    errorMessage: '',
    isUpdating: false,
    errorUpdating: false,
    errorMessage: '',
    professional: {}
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

export const professionalUpdateRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const professionalUpdateSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        professional: action.professional,
        isUpdating: false
    }
}

export const professionalUpdateError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: true,
        errorMessage: action.error
    }
}

export const professionalClearErrors = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: false,
        errorMessage: ''
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
    [Types.PROFESSIONAL_UPDATE_REQUEST]: professionalUpdateRequest,
    [Types.PROFESSIONAL_UPDATE_SUCCESS]: professionalUpdateSuccess,
    [Types.PROFESSIONAL_UPDATE_ERROR]: professionalUpdateError,
    [Types.PROFESSIONAL_CLEAR_ERRORS]: professionalClearErrors,
}

export default createReducer(INITIAL_STATE, HANDLES)