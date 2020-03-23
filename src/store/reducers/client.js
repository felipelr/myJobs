import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    client: {},
    isUpdating: false,
    errorUpdating: false,
    errorMessage: '',
    selected: {}
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
        selected: {},
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

export const editClientAddress = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const deleteClientAddress = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const clientNewServiceOrderRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const clientNewServiceOrderSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const clientNewServiceOrderError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: true,
        errorMessage: action.error
    }
}

export const clientSelected= (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selected: action.client
    }
}

export const clientCallRateRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const clientCallRateSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const clientCallRateError = (state = INITIAL_STATE, action) => {
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
    [Types.CLIENT_CLEAR_ERRORS]: clientClearErrors,
    [Types.ADD_NEW_CLIENT_ADDRESS]: addNewClientAddress,
    [Types.EDIT_CLIENT_ADDRESS]: editClientAddress,
    [Types.DELETE_CLIENT_ADDRESS]: deleteClientAddress,    
    [Types.CLIENT_NEW_SERVICE_ORDER_REQUEST]: clientNewServiceOrderRequest,
    [Types.CLIENT_NEW_SERVICE_ORDER_SUCCESS]: clientNewServiceOrderSuccess,
    [Types.CLIENT_NEW_SERVICE_ORDER_ERROR]: clientNewServiceOrderError,
    [Types.CLIENT_SELECTED]: clientSelected,
    [Types.CLIENT_CALL_RATE_REQUEST]: clientCallRateRequest,
    [Types.CLIENT_CALL_RATE_SUCCESS]: clientCallRateSuccess,
    [Types.CLIENT_CALL_RATE_ERROR]: clientCallRateError,
}

export default createReducer(INITIAL_STATE, HANDLERS)