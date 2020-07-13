import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMessage: '',
    favorities: [],
}

export const favoriteAdd = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
    }
}

export const favoriteAddSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        favorities: [...state.favorities, action.favorite],
    }
}

export const favoriteAddError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
    }
}

export const favoriteSetFavorities = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        favorities: action.favorities,
    }
}

export const favoriteRemove = (state = INITIAL_STATE, action) => {
    console.log('favorite => ', 'teste2')
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
    }
}

export const favoriteRemoveSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        favorities: state.favorities.filter(item => item.id !== action.favorite.id),
    }
}

export const favoriteRemoveError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
    }
}

export const HANDLERS = {
    [Types.FAVORITE_ADD] : favoriteAdd,
    [Types.FAVORITE_ADD_SUCCESS] : favoriteAddSuccess,
    [Types.FAVORITE_ADD_ERROR] : favoriteAddError,
    [Types.FAVORITE_SET_FAVORITIES] : favoriteSetFavorities,
    [Types.FAVORITE_REMOVE] : favoriteRemove,
    [Types.FAVORITE_REMOVE_SUCCESS] : favoriteRemoveSuccess,
    [Types.FAVORITE_REMOVE_ERROR] : favoriteRemoveError,
}

export default createReducer(INITIAL_STATE, HANDLERS)