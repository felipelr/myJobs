import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
    //Auth Actions
    loginRequest: ['email', 'password'],
    loginSuccess: ['data'],
    loginError: ['error'],
    loginCleanError: null,
    authRequest: null,
    authSuccess: ['data'],
    authError: null,
    logoutRequest: null,
    logoutSuccess: null,
    logoutError: ['error'],

    //SignUp Actions
    signupRequest: ['user'],
    signupSuccess: ['newUser'],
    signupError: ['error'],

    //Actions de Categorias 
    categoriasLoadRequest: ['token'],
    categoriasLoadSuccess: ['data'],
    categoriasLoadError: ['error'],
    categoriasSelected: ['data'],

    //Actions de Subcategories
    subcategoriesLoadRequest: ['token'],
    subcategoriesLoadSuccess: ['subcategories'],
    subcategoriesLoadError: ['error'],
    subcategoriesSelected: ['subcategory'],
    subcategoriesByCategoryRequest: ['category', 'token'],


    //Social Midia Actions
    socialMidiaSignupInit: ['user'],
    socialMidiaSignupRequest: ['user'],
    socialMidiaSignupSuccess: ['newUser'],
    socialMidiaSignupError: ['error'],
    socialMidiaVerifyAccount: ['socialMidiaId', 'socialMidiaType'],
    socialMidiaVerifyError: ['error'],
    socialMidiaVerifySuccess: ['user'],

    //Client Actions
    clientUpdateRequest: ['client'],
    clientUpdateSuccess: ['client'],
    clientUpdateError: ['error']
})

export default Creators