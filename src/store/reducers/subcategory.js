import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    subcategories: [],
    error: false,
    errorMessage: '',
    selected: {}
}

export const subcategoriesLoadRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true
    }
}

export const subcategoriesLoadSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        subcategories: action.data,
        loading: false
    }
}

export const subcategoriesLoadError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.error
    }
}

export const subcategoriesSelected = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selected: action.data
    }
}

export const HANDLES = {
    [Types.SUBCATEGORIAS_LOAD_REQUEST]: subcategoriasLoadRequest,
    [Types.SUBCATEGORIAS_LOAD_SUCCESS]: subcategoriasLoadSuccess,
    [Types.SUBCATEGORIAS_LOAD_ERROR]: subcategoriasLoadError,
    [Types.SUBCATEGORIAS_SELECTED]: subcategoriasSelected,
}

export default createReducer(INITIAL_STATE, HANDLES)