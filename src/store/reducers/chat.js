import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    loading: false,
    error: false,
    errorMessage: '',
    lastId: 0,
    fcmToken: '',
    sendedMessage: {},
    receivedMessage: {}
}

export const chatSendNewMessage = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    }
}

export const chatSendNewMessageSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        sendedMessage: action.message,
        loading: false,
        error: false,
        errorMessage: ''
    }
}

export const chatSendNewMessageError = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
    }
}

export const chatSetFcmToken = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        fcmToken: action.fcmToken
    }
}

export const chatSetReceivedMessage = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        receivedMessage: action.message
    }
}

export const chatUpdateUserFcmToken = (state = INITIAL_STATE, action) => {
    return {
        ...state,
    }
}

export const HANDLES = {
    [Types.CHAT_SEND_NEW_MESSAGE]: chatSendNewMessage,
    [Types.CHAT_SEND_NEW_MESSAGE_SUCCESS]: chatSendNewMessageSuccess,
    [Types.CHAT_SEND_NEW_MESSAGE_ERROR]: chatSendNewMessageError,
    [Types.CHAT_SET_FCM_TOKEN]: chatSetFcmToken,
    [Types.CHAT_SET_RECEIVED_MESSAGE]: chatSetReceivedMessage,
    [Types.CHAT_UPDATE_USER_FCM_TOKEN]: chatUpdateUserFcmToken,
}

export default createReducer(INITIAL_STATE, HANDLES)