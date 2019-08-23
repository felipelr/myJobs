import { all, fork } from 'redux-saga/effects'

import * as authSagas from './auth'
import * as categoriaSagas from './categoria'
import * as signupSagas from './signup'
import * as socialMidiaSignupSagas from './socialMidiaSignup'
import * as subcategory from './subcategory'

export default function* rootSaga() {
    yield all([
        ...Object.values(authSagas),
        ...Object.values(categoriaSagas),
        ...Object.values(signupSagas),
        ...Object.values(socialMidiaSignupSagas),
        ...Object.values(subcategory),
    ].map(fork))
}