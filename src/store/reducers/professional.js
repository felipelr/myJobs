import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    professionals: [],
    error: false,
    errorMessage: '',
    isUpdating: false,
    errorUpdating: false,
    errorMessage: '',
    professional: {},
    selected: {},
    newServicesConfig: {},
    newCallMsg: {},
    newCall: {},
    servicesUpdated: false,
    ratingUpdated: false,
    professionalView: {},
}

export const professionalsLoadRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
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

export const professionalsCleanErrors = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        error: false,
        errorMessage: ''
    }
}

export const professionalsSendNewSuggest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const professionalsSendNewSuggestSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: ''
    }
}

export const professionalsSendNewSuggestError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
    }
}

export const professionalUpdateRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const professionalUpdateSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        professional: action.professional,
        selected: {},
        isUpdating: false
    }
}

export const professionalUpdateError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: true,
        errorMessage: action.error
    }
}

export const professionalClearErrors = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: false,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const addNewProfessionalAddress = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const editProfessionalAddress = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const deleteProfessionalAddress = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isUpdating: true,
        errorUpdating: false,
        errorMessage: ''
    }
}

export const professionalSelected = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selected: action.professional
    }
}

export const professionalConfigCategory = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
        newServicesConfig: {},
        servicesUpdated: false,
    }
}

export const professionalConfigCategorySuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        newServicesConfig: action.config,
        servicesUpdated: true,
    }
}

export const professionalConfigCategoryError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
    }
}

export const newProfessionalCallRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const newProfessionalCallSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        newCall: action.call,
        loading: false,
        error: false,
        errorMessage: ''
    }
}

export const newProfessionalCallError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
    }
}

export const professionalFinishCallRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
    }
}

export const professionalFinishCallError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
    }
}

export const professionalFinishCallSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
    }
}

export const professionalNewCallRegistered = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        newCallMsg: action.mensagem
    }
}

export const professionalNewCallClearMsg = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        newCallMsg: {},
        newCall: {},
    }
}

export const professionalSetRatingUpdated = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        ratingUpdated: action.updated
    }
}

export const professionalSetProfessionalView = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        professionalView: action.professional
    }
}

export const professionalAddRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: '',
    }
}

export const professionalAddError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error,
    }
}

export const professionalAddSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',       
        professional: action.professional, 
    }
}

export const HANDLES = {
    [Types.PROFESSIONALS_LOAD_REQUEST]: professionalsLoadRequest,
    [Types.PROFESSIONALS_LOAD_SUCCESS]: professionalsLoadSuccess,
    [Types.PROFESSIONALS_LOAD_ERROR]: professionalsLoadError,
    [Types.PROFESSIONALS_CLEAN_ERRORS]: professionalsCleanErrors,
    [Types.PROFESSIONALS_SEND_NEW_SUGGEST]: professionalsSendNewSuggest,
    [Types.PROFESSIONALS_SEND_NEW_SUGGEST_SUCCESS]: professionalsSendNewSuggestSuccess,
    [Types.PROFESSIONALS_SEND_NEW_SUGGEST_ERROR]: professionalsSendNewSuggestError,
    [Types.PROFESSIONAL_UPDATE_REQUEST]: professionalUpdateRequest,
    [Types.PROFESSIONAL_UPDATE_SUCCESS]: professionalUpdateSuccess,
    [Types.PROFESSIONAL_UPDATE_ERROR]: professionalUpdateError,
    [Types.PROFESSIONAL_CLEAR_ERRORS]: professionalClearErrors,
    [Types.ADD_NEW_PROFESSIONAL_ADDRESS]: addNewProfessionalAddress,
    [Types.EDIT_PROFESSIONAL_ADDRESS]: editProfessionalAddress,
    [Types.DELETE_PROFESSIONAL_ADDRESS]: deleteProfessionalAddress,
    [Types.PROFESSIONAL_SELECTED]: professionalSelected,
    [Types.PROFESSIONAL_CONFIG_CATEGORY]: professionalConfigCategory,
    [Types.PROFESSIONAL_CONFIG_CATEGORY_SUCCESS]: professionalConfigCategorySuccess,
    [Types.PROFESSIONAL_CONFIG_CATEGORY_ERROR]: professionalConfigCategoryError,
    [Types.NEW_PROFESSIONAL_CALL_REQUEST]: newProfessionalCallRequest,
    [Types.NEW_PROFESSIONAL_CALL_SUCCESS]: newProfessionalCallSuccess,
    [Types.NEW_PROFESSIONAL_CALL_ERROR]: newProfessionalCallError,
    [Types.PROFESSIONAL_FINISH_CALL_REQUEST]: professionalFinishCallRequest,
    [Types.PROFESSIONAL_FINISH_CALL_ERROR]: professionalFinishCallError,
    [Types.PROFESSIONAL_FINISH_CALL_SUCCESS]: professionalFinishCallSuccess,
    [Types.PROFESSIONAL_NEW_CALL_REGISTERED]: professionalNewCallRegistered,
    [Types.PROFESSIONAL_NEW_CALL_CLEAR_MSG]: professionalNewCallClearMsg,
    [Types.PROFESSIONAL_SET_RATING_UPDATED]: professionalSetRatingUpdated,
    [Types.PROFESSIONAL_SET_PROFESSIONAL_VIEW]: professionalSetProfessionalView,
    [Types.PROFESSIONAL_ADD_REQUEST]: professionalAddRequest,
    [Types.PROFESSIONAL_ADD_ERROR]: professionalAddError,
    [Types.PROFESSIONAL_ADD_SUCCESS]: professionalAddSuccess,
}

export default createReducer(INITIAL_STATE, HANDLES)