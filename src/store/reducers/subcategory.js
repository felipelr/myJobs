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
        subcategories: action.subcategories,
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
    console.log(JSON.stringify(action))
    return {
        ...state,
        selected: action.subcategory
    }
}

export const subcategoriesByCategoryRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true
    }
}

export const HANDLES = {
    [Types.SUBCATEGORIES_LOAD_REQUEST]: subcategoriesLoadRequest,
    [Types.SUBCATEGORIES_LOAD_SUCCESS]: subcategoriesLoadSuccess,
    [Types.SUBCATEGORIES_LOAD_ERROR]: subcategoriesLoadError,
    [Types.SUBCATEGORIES_SELECTED]: subcategoriesSelected,
    [Types.SUBCATEGORIES_BY_CATEGORY_REQUEST]: subcategoriesByCategoryRequest,
}

export default createReducer(INITIAL_STATE, HANDLES)