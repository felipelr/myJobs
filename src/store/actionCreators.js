import { createActions } from 'reduxsauce'

export const {  Types, Creators } = createActions({
    //Auth Actions
    loginRequest: ['email', 'password'],
    loginSuccess: ['data'],
    loginError: ['error'],
    authRequest: null,
    authSuccess: ['user'],
    authError: null,

    //Actions de Categorias 
    categoriesLoadRequest: ['token'],
    categoriesLoadSuccess: ['data'],
    categoriesLoadError: ['error']
})

export default Creators