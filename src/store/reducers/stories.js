import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMessage: '',
    lastStory: {},
    finishPresentation: false,
}

export const storiesSaveRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const storiesSaveSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
        lastStory: action.story,
    }
}

export const storiesSaveError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
    }
}

export const storiesClearError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: ''
    }
}

export const storiesSetFinishPresentation = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        finishPresentation: action.finish
    }
}

export const storiesSaveIntragramData = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const storiesSaveIntragramDataSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        errorMessage: '',
    }
}

export const HANDLES = {
    [Types.STORIES_SAVE_REQUEST]: storiesSaveRequest,
    [Types.STORIES_SAVE_SUCCESS]: storiesSaveSuccess,
    [Types.STORIES_SAVE_ERROR]: storiesSaveError,
    [Types.STORIES_CLEAR_ERROR]: storiesClearError,
    [Types.STORIES_SET_FINISH_PRESENTATION]: storiesSetFinishPresentation,
    [Types.STORIES_SAVE_INTRAGRAM_DATA]: storiesSaveIntragramData,
    [Types.STORIES_SAVE_INTRAGRAM_DATA_SUCCESS]: storiesSaveIntragramDataSuccess,
}

export default createReducer(INITIAL_STATE, HANDLES)