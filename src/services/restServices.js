import { useReducer, useEffect } from 'react'
import axios from 'axios'
import { urlMyJobsAPI } from '../config/config'


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
            console.log('URL Requisitada = ' + `${urlMyJobsAPI}` + newUrl)
            const resposta = await axios.get(`${urlMyJobsAPI}` + newUrl, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            
            dispatch({ type: 'SUCCESS', data: resposta.data })
        } catch (e) {
            console.log(newUrl)
            dispatch({ type: 'ERROR', errorMessage: e.message })
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
