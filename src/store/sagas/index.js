import { all, fork } from 'redux-saga/effects'

import * as authSagas from './auth'
import * as categoriaSagas from './categoria'
import * as signupSagas from './signup'

export default function* rootSaga() {
    yield all([
        ...Object.values(authSagas),
        ...Object.values(categoriaSagas),
        ...Object.values(signupSagas),
    ].map(fork))
}