import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

setProfessionalData = async (professionalData) => {
    try {
        await AsyncStorage.setItem('@professionalData', JSON.stringify(professionalData))
    } catch (e) {
        console.log(e)
    }
}

function* sendNewSuggest(action) {
    try {
        let postResp = yield axios.post(`${urlMyJobsAPI}/professionals/new_suggest.json`,
            {
                ...action.data
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.professionalsSendNewSuggestError(postResp.data.errorMessage))
        }
        else {
            yield put(ActionCreator.professionalsSendNewSuggestSuccess())
        }
    } catch (ex) {
        let messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalsSendNewSuggestError(messageError))
    }
}

function* updateProfessional(action) {
    try {
        const putResp = yield axios.put(`${urlMyJobsAPI}/professionals/edit/${action.professional.id}.json`,
            {
                ...action.professional
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (putResp.data.error) {
            yield put(ActionCreator.professionalUpdateError(putResp.data.errorMessage))
        }
        else {
            const professional = putResp.data.professional
            setProfessionalData(professional)
            yield put(ActionCreator.professionalUpdateSuccess(professional))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalUpdateError(messageError))
    }
}

function* addNewProfessionalAddress(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/professionalsAddresses/add.json`,
            {
                ...action.professionalAddress
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.professionalUpdateError(postResp.data.errorMessage))
        }
        else {
            const professional = postResp.data.professional
            setProfessionalData(professional)
            yield put(ActionCreator.professionalUpdateSuccess(professional))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalUpdateError(messageError))
    }
}

function* editProfessionalAddress(action) {
    try {
        const putResp = yield axios.put(`${urlMyJobsAPI}/professionalsAddresses/edit/${action.professionalAddress.id}.json`,
            {
                ...action.professionalAddress
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (putResp.data.error) {
            yield put(ActionCreator.professionalUpdateError(putResp.data.errorMessage))
        }
        else {
            const professional = putResp.data.professional
            setProfessionalData(professional)
            yield put(ActionCreator.professionalUpdateSuccess(professional))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalUpdateError(messageError))
    }
}

function* deleteProfessionalAddress(action) {
    try {
        const deleteResp = yield axios.delete(`${urlMyJobsAPI}/professionalsAddresses/delete/${action.id}.json`,
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (deleteResp.data.error) {
            yield put(ActionCreator.professionalUpdateError(deleteResp.data.errorMessage))
        }
        else {
            const professional = deleteResp.data.professional
            setProfessionalData(professional)
            yield put(ActionCreator.professionalUpdateSuccess(professional))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.professionalUpdateError(messageError))
    }
}

function* professionalConfigCategory(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/professionalServices/config.json`,
            {
                ...action.config
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )
        
        console.log('post data => ', postResp.data)

        if (postResp.data.error) {
            yield put(ActionCreator.professionalConfigCategoryError(postResp.data.errorMessage))
        }
        else {
            yield put(ActionCreator.professionalConfigCategorySuccess(postResp.data.config))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        console.log('post messageError => ', messageError)
        yield put(ActionCreator.professionalConfigCategoryError(messageError))
    }
}

function* newProfessionalCallRequest(action) {
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/calls/addCall.json`,
            {
                ...action.call
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            console.log('error => ', JSON.stringify(postResp.data.errorMessage))
            yield put(ActionCreator.newProfessionalCallError(postResp.data.errorMessage))
        }
        else {
            console.log('Success => ' + JSON.stringify(postResp.data))
            yield put(ActionCreator.newProfessionalCallSuccess(postResp.data.call))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido' 
        console.log('erro => ' + messageError)
        yield put(ActionCreator.newProfessionalCallError(messageError))
    }
}

function* professionalFinishCallRequest(action){
    try {
        console.log(action.call)
        const postResp = yield axios.post(`${urlMyJobsAPI}/calls/finish.json`,
            {
                ...action.call
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            console.log('error => ', JSON.stringify(postResp.data.errorMessage))
            yield put(ActionCreator.professionalFinishCallError(postResp.data.errorMessage))
        }
        else {
            console.log('Success => ' + JSON.stringify(postResp.data))
            yield put(ActionCreator.professionalFinishCallSuccess(postResp.data.call))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido' 
        console.log('erro => ' + messageError)
        yield put(ActionCreator.professionalFinishCallError(messageError))
    }
}


export default function* rootProfessionals() {
    yield all([
        takeLatest(Types.PROFESSIONALS_SEND_NEW_SUGGEST, sendNewSuggest),
        takeLatest(Types.PROFESSIONAL_UPDATE_REQUEST, updateProfessional),
        takeLatest(Types.ADD_NEW_PROFESSIONAL_ADDRESS, addNewProfessionalAddress),
        takeLatest(Types.EDIT_PROFESSIONAL_ADDRESS, editProfessionalAddress),
        takeLatest(Types.DELETE_PROFESSIONAL_ADDRESS, deleteProfessionalAddress),
        takeLatest(Types.PROFESSIONAL_CONFIG_CATEGORY, professionalConfigCategory),
        takeLatest(Types.NEW_PROFESSIONAL_CALL_REQUEST, newProfessionalCallRequest),
        takeLatest(Types.PROFESSIONAL_FINISH_CALL_REQUEST, professionalFinishCallRequest),
    ])
}