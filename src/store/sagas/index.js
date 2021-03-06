import { all, fork } from 'redux-saga/effects'

import * as authSagas from './auth'
import * as categoriaSagas from './categoria'
import * as signupSagas from './signup'
import * as socialMidiaSignupSagas from './socialMidiaSignup'
import * as subcategorySagas from './subcategory'
import * as clientSagas from './client'
import * as highlightsSagas from './highlights'
import * as professionalsSagas from './professional'
import * as storiesSagas from './stories'
import * as chatSagas from './chat'
import * as serviceSagas from './service'
import * as favoriteSagas from './favorite'

export default function* rootSaga() {
    yield all([
        ...Object.values(authSagas),
        ...Object.values(categoriaSagas),
        ...Object.values(signupSagas),
        ...Object.values(socialMidiaSignupSagas),
        ...Object.values(subcategorySagas),
        ...Object.values(clientSagas),
        ...Object.values(highlightsSagas),
        ...Object.values(professionalsSagas),
        ...Object.values(storiesSagas),
        ...Object.values(chatSagas),
        ...Object.values(serviceSagas),
        ...Object.values(favoriteSagas),
    ].map(fork))
}