import { combineReducers } from 'redux'

import auth from './auth'
import categoria from './categoria'
import signup from './signup'
import socialMidiaSignup from './socialMidiaSignup'

const rootReducer = combineReducers({
    auth,
    categoria,
    signup,
    socialMidiaSignup
})

export default rootReducer