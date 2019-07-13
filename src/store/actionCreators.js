import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
    //Auth Actions
    loginRequest: ['email', 'password'],
    loginSuccess: ['data'],
    loginError: ['error'],
    authRequest: null,
    authSuccess: ['data'],
    authError: null,
    logoutRequest: null,
    logoutSuccess: null,
    logoutError: ['error'],

    //SignUp Actions
    signupRequest: ['data'],
    signupSuccess: ['data'],
    signupError: ['error'],

    //Actions de Categorias 
    categoriasLoadRequest: ['token'],
    categoriasLoadSuccess: ['data'],
    categoriasLoadError: ['error']
})

export default Creators