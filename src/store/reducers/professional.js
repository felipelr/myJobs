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
        loading: true
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
 

export const HANDLES = {
    [Types.PROFESSIONALS_LOAD_REQUEST]: professionalsLoadRequest,
    [Types.PROFESSIONALS_LOAD_SUCCESS]: professionalsLoadSuccess,
    [Types.PROFESSIONALS_LOAD_ERROR]: professionalsLoadError,  
}

export default createReducer(INITIAL_STATE, HANDLES)