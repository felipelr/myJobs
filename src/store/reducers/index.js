import { combineReducers } from 'redux'

import auth from './auth'
import categoria from './categoria'
import signup from './signup'
import socialMidiaSignup from './socialMidiaSignup'
import subcategory from './subcategory'
import client from './client'
import highlights from './highlights'
import professional from './professional'
import professionalHome from './professionalHome'
import stories from './stories'
import service from './service'
import chat from './chat'
import favorite from './favorite'

const rootReducer = combineReducers({
    auth,
    categoria,
    signup,
    socialMidiaSignup,
    subcategory,
    client,
    highlights,
    professional,
    professionalHome,
    stories,
    service,
    chat,
    favorite,
})

export default rootReducer