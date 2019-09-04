import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    client: {},
    isUpdating: false,
    errorUpdating: false,
    errorMessage: '',
}

export const clientUpdateRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const clientUpdateSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        client: action.client,
        isUpdating: false
    }
}

export const clientUpdateError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: true,
        errorMessage: action.error
    }
}

export const HANDLERS = {
    [Types.CLIENT_UPDATE_REQUEST]: clientUpdateRequest,
    [Types.CLIENT_UPDATE_SUCCESS]: clientUpdateSuccess,
    [Types.CLIENT_UPDATE_ERROR]: clientUpdateError,
}

export default createReducer(INITIAL_STATE, HANDLERS)