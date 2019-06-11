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
    categoriasLoadRequest: ['token'],
    categoriasLoadSuccess: ['data'],
    categoriasLoadError: ['error']
})

export default Creators