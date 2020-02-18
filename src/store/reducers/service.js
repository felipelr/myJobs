import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMessage: '',
    selected: {},
}

export const serviceSelected = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selected: action.service
    }
}

export const serviceNewSuggestion = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const serviceNewSuggestionSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
    }
}

export const serviceNewSuggestionError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
    }
}

export const HANDLES = {
    [Types.SERVICE_SELECTED]: serviceSelected,
    [Types.SERVICE_NEW_SUGGESTION]: serviceNewSuggestion,
    [Types.SERVICE_NEW_SUGGESTION_SUCCESS]: serviceNewSuggestionSuccess,
    [Types.SERVICE_NEW_SUGGESTION_ERROR]: serviceNewSuggestionError,
}

export default createReducer(INITIAL_STATE, HANDLES)