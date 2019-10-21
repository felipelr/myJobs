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

export const clientClearErrors = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const addNewClientAddress = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const HANDLERS = {
    [Types.CLIENT_UPDATE_REQUEST]: clientUpdateRequest,
    [Types.CLIENT_UPDATE_SUCCESS]: clientUpdateSuccess,
    [Types.CLIENT_UPDATE_ERROR]: clientUpdateError,
    [Types.CLIENT_CLEAR_ERRORS]: clientClearErrors,
    [Types.ADD_NEW_CLIENT_ADDRESS]: addNewClientAddress,
}

export default createReducer(INITIAL_STATE, HANDLERS)