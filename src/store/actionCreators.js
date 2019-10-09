import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
    //Auth Actions
    loginRequest: ['email', 'password', 'userType'],
    loginSuccess: ['data'],
    loginError: ['error'],
    loginCleanError: null,
    authSuccess: ['data'],
    logoutSuccess: null,
    changePasswordRequest: ['token', 'user', 'currentPassword', 'newPassword'],
    changePasswordSuccess: null,
    changePasswordError: ['error'],
    authCleanErrors: null,

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
    subcategoriesByCategoryRequest: ['category', 'token'],
    getServicesSubcategoryRequest: ['subcategory', 'token'],
    getServicesSubcategorySuccess: ['services'],

    //Professionals
    professionalsLoadRequest: ['token'],
    professionalsLoadSuccess: ['highlights'],
    professionalsLoadError: ['error'],
    professionalsCleanErrors: null,
    professionalsSendNewSuggest: ['token', 'data'],
    professionalsSendNewSuggestSuccess: null,
    professionalsSendNewSuggestError: ['error'],
    professionalUpdateRequest: ['professional', 'token'],
    professionalUpdateSuccess: ['professional'],
    professionalUpdateError: ['error'],
    professionalClearErrors: null,

    //Highlights
    highlightsLoadRequest: ['token'],
    highlightsLoadSuccess: ['highlights'],
    highlightsLoadError: ['error'],
    highlightsLoadBySubcategoryRequest: ['subcategory','token'],

    //Social Midia Actions
    socialMidiaSignupInit: ['user'],
    socialMidiaSignupRequest: ['user'],
    socialMidiaSignupSuccess: ['newUser'],
    socialMidiaSignupError: ['error'],
    socialMidiaVerifyAccount: ['socialMidiaId', 'socialMidiaType'],
    socialMidiaVerifyError: ['error'],
    socialMidiaVerifySuccess: ['user'],

    //Client Actions
    clientUpdateRequest: ['client', 'token'],
    clientUpdateSuccess: ['client'],
    clientUpdateError: ['error'],
    clientClearErrors: null,
})

export default Creators