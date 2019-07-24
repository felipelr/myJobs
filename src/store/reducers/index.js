import { combineReducers } from 'redux'

import auth from './auth'
import categoria from './categoria'
import signup from './signup'

const rootReducer = combineReducers({
    auth,
    categoria,
    signup
})

export default rootReducer