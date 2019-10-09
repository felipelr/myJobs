import axios from 'axios'
import { urlMyJobsAPI } from '../config/config'

const apis = {
    loadCategorias: (token) => axios.get(`${urlMyJobsAPI}/categories/index.json`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }),
    subcategoriesByCategoryRequest: (token, categoryId) => axios.get(`${urlMyJobsAPI}/subcategories/view/${categoryId}.json`, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }),
}

export default apis;