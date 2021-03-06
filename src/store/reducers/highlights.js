import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    highlights: [],
    error: false,
    errorMessage: '', 
}

export const highlightsLoadRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true
    }
}

export const highlightsLoadSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        highlights: action.highlights,
        loading: false
    }
}

export const highlightsLoadError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.error
    }
}

export const highlightsLoadBySubcategoryRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true
    }
}
 
export const HANDLES = {
    [Types.HIGHLIGHTS_LOAD_REQUEST]: highlightsLoadRequest,
    [Types.HIGHLIGHTS_LOAD_SUCCESS]: highlightsLoadSuccess,
    [Types.HIGHLIGHTS_LOAD_ERROR]: highlightsLoadError,
    [Types.HIGHLIGHTS_LOAD_BY_SUBCATEGORY_REQUEST]: highlightsLoadBySubcategoryRequest,
}

export default createReducer(INITIAL_STATE, HANDLES)