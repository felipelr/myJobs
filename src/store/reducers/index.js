import { combineReducers } from 'redux'

import auth from './auth'
import categoria from './categoria'
import signup from './signup'
import socialMidiaSignup from './socialMidiaSignup'
import subcategory from './subcategory'
import client from './client'

const rootReducer = combineReducers({
    auth,
    categoria,
    signup,
    socialMidiaSignup,
    subcategory,
    client
})

export default rootReducer