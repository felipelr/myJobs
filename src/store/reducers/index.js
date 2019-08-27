import { combineReducers } from 'redux'

import auth from './auth'
import categoria from './categoria'
import signup from './signup'
import socialMidiaSignup from './socialMidiaSignup'
import subcategory from './subcategory'

const rootReducer = combineReducers({
    auth,
    categoria,
    signup,
    socialMidiaSignup,
    subcategory
})

export default rootReducer