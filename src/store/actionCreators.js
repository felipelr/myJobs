import { createActions } from 'reduxsauce'

export const { Types, Creators } = createActions({
    //Auth Actions
    loginRequest: ['email', 'password'],
    loginSuccess: ['data'],
    loginError: ['error'],
    loginCleanError: null,
    authSuccess: ['data'],
    logoutRequest: null,
    logoutSuccess: null,
    changePasswordRequest: ['token', 'user', 'currentPassword', 'newPassword'],
    changePasswordSuccess: null,
    changePasswordError: ['error'],
    authCleanErrors: null,
    authSetUserType: ['userType'],
    authSetInstaTokenLong: ['token'],
    authSetInstaUserId: ['id'],

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
    addNewProfessionalAddress: ['token', 'professionalAddress'],
    editProfessionalAddress: ['token', 'professionalAddress'],
    deleteProfessionalAddress: ['token', 'id'],
    professionalSelected: ['professional'],
    professionalConfigCategory: ['token', 'config'],
    professionalConfigCategorySuccess: ['config'],
    professionalConfigCategoryError: ['error'],
    newProfessionalCallRequest: ['token', 'call'],
    newProfessionalCallError: ['error'],
    newProfessionalCallSuccess: ['call'],
    professionalFinishCallRequest: ['token', 'call'],
    professionalFinishCallError: ['error'],
    professionalFinishCallSuccess: ['call'],
    professionalNewCallRegistered: ['mensagem'],
    professionalNewCallClearMsg: null,
    professionalSetRatingUpdated: ['updated'],
    professionalSetProfessionalView: ['professional'],
    professionalAddRequest: ['token', 'professional'],
    professionalAddSuccess: ['professional'],
    professionalAddError: ['error'],

    //Highlights
    highlightsLoadRequest: ['token'],
    highlightsLoadSuccess: ['highlights'],
    highlightsLoadError: ['error'],
    highlightsLoadBySubcategoryRequest: ['subcategory', 'token'],

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
    addNewClientAddress: ['token', 'clientAddress'],
    editClientAddress: ['token', 'clientAddress'],
    deleteClientAddress: ['token', 'id'],
    clientNewServiceOrderRequest: ['token', 'serviceOrder'],
    clientNewServiceOrderSuccess: ['serviceOrder'],
    clientNewServiceOrderError: ['error'],
    clientSelected: ['client'],
    clientCallRateRequest: ['token', 'rate'],
    clientCallRateSuccess: ['rate'],
    clientCallRateError: ['error'],
    clientSetUpdateCallBadge: ['updateCallBadge'],

    //Services
    serviceSelected: ['service'],
    serviceNewSuggestion: ['token', 'serviceSuggestion'],
    serviceNewSuggestionSuccess: ['serviceSuggestion'],
    serviceNewSuggestionError: ['error'],

    //ProfessionalHome
    professionalHomeSetSelectedService: ['service'],

    //Stories
    storiesSaveRequest: ['token', 'story'],
    storiesSaveSuccess: ['story'],
    storiesSaveError: ['error'],
    storiesClearError: null,
    storiesSetFinishPresentation: ['finish'],
    storiesSaveIntragramData: ['story'],
    storiesSaveIntragramDataSuccess: null,
    storiesSetInstagramData: ['stories'],

    //Chat
    chatSendNewMessage: ['token', 'message'],
    chatSendNewMessageSuccess: ['message'],
    chatSendNewMessageError: ['error'],
    chatSetFcmToken: ['fcmToken'],
    chatSetReceivedMessage: ['message'],
    chatUpdateUserFcmToken: ['token', 'userId', 'fcmToken'],
    chatCleanSendedMessage: null,
    chatSetScreenChatVisible: ['visible'],
    chatSetUpdateChatBadge: ['updateChatbadge'],

    //Favorite    
    favoriteAdd: ['token', 'favorite'],
    favoriteAddSuccess: ['favorite'],
    favoriteAddError: ['error'],
    favoriteSetFavorities: ['favorities'],
    favoriteRemove: ['token', 'favorite'],
    favoriteRemoveSuccess: ['favorite'],
    favoriteRemoveError: ['error'],
})

export default Creators