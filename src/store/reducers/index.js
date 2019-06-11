import { combineReducers } from 'redux'

import auth from './auth'
import categoria from './categoria'

const rootReducer = combineReducers({
    auth: auth,
    categoria: categoria
})

export default rootReducer