import { useReducer, useEffect } from 'react'
import axios from 'axios'
import { urlMyJobsAPI } from '../config/config'
import { stringify } from 'qs'

const reducer = (state, action) => {
    switch (action.type) {
        case 'REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage
            }
        default:
            return state;
    }

}

const INITIAL_STATE = {
    loading: false,
    data: {},
    error: false,
    errorMessage: '',
}

const useGet = (url, token) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
    const refetch = async (newUrl) => {
        dispatch({ type: 'REQUEST' })
        try {
            const resposta = await axios.get(`${urlMyJobsAPI}` + newUrl, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })

            dispatch({ type: 'SUCCESS', data: resposta.data })
            return resposta.data
        } catch (ex) {
            const messageError = ex.message
            console.log(JSON.stringify(ex))
            dispatch({ type: 'ERROR', errorMessage: messageError })
            return []
        }
    }
    useEffect(() => {
        if (url !== '') {
            refetch(url);
        }
    }, [url])
    return {
        ...state,
        refetch,
    };
}


export default useGet
