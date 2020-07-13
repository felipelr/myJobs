import { put, takeLatest, all } from 'redux-saga/effects'
import axios from 'axios'

import { Types } from '../actionCreators'
import ActionCreator from '../actionCreators'
import { urlMyJobsAPI } from '../../config/config'

function* favoriteAdd(action){
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/favoriteProfessionals/addFavorite.json`,
            {
                ...action.favorite
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )

        if (postResp.data.error) {
            yield put(ActionCreator.favoriteAddError(postResp.data.errorMessage))
        }
        else {
            const { favorite } = postResp.data
            yield put(ActionCreator.favoriteAddSuccess(favorite))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.favoriteAddError(messageError))
    }
}

function* favoriteRemove(action){
    console.log('favorite => ', 'teste1')
    try {
        const postResp = yield axios.post(`${urlMyJobsAPI}/favoriteProfessionals/removeFavorite/${action.favorite.id}.json`,
            {
                ...action.favorite
            },
            {
                headers: {
                    Authorization: 'Bearer ' + action.token,
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        )
        console.log('favorite => ', postResp.data)

        if (postResp.data.error) {
            yield put(ActionCreator.favoriteRemoveError(postResp.data.errorMessage))
        }
        else {
            const { favorite } = postResp.data
            yield put(ActionCreator.favoriteRemoveSuccess(favorite))
        }
    } catch (ex) {
        const messageError = ex.response ? ex.response.data.message : ex.message ? ex.message : 'Erro Desconhecido'
        yield put(ActionCreator.favoriteRemoveError(messageError))
    }
}

export default function* rootFavorities() {
    yield all([
        takeLatest(Types.FAVORITE_ADD, favoriteAdd),
        takeLatest(Types.FAVORITE_REMOVE, favoriteRemove),
    ])
}