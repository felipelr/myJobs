import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    selectedService: { id: 0, title: '' }
}

export const professionalHomeSetSelectedService = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        selectedService: action.service,
    }
}

export const HANDLES = {
    [Types.PROFESSIONAL_HOME_SET_SELECTED_SERVICE]: professionalHomeSetSelectedService,
}

export default createReducer(INITIAL_STATE, HANDLES)