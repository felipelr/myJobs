import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false, 
    error: false,
    errorMessage: '',
    selected: {}, 
}

 
export const serviceSelected = (state = INITIAL_STATE, action) => { 
    console.log('chegou no reducer')
    return {
        ...state,
        selected: action.service
    }
} 

export const HANDLES = { 
    [Types.SERVICE_SELECTED]: serviceSelected,  
}

export default createReducer(INITIAL_STATE, HANDLES)