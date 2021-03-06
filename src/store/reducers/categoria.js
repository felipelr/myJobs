import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    data: [],
    error: false,
    errorMessage: '',
    selected: null
}

export const categoriasLoadRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true
    }
}

export const categoriasLoadSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        data: action.data,
        loading: false
    }
}

export const categoriasLoadError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: true,
        loading: false,
        errorMessage: action.error
    }
}

export const categoriasSelected = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selected: action.data
    }
}

export const HANDLES = {
    [Types.CATEGORIAS_LOAD_REQUEST]: categoriasLoadRequest,
    [Types.CATEGORIAS_LOAD_SUCCESS]: categoriasLoadSuccess,
    [Types.CATEGORIAS_LOAD_ERROR]: categoriasLoadError,
    [Types.CATEGORIAS_SELECTED]: categoriasSelected,
}

export default createReducer(INITIAL_STATE, HANDLES)