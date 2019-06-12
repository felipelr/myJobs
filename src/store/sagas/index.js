import { all, fork } from 'redux-saga/effects'
 
import * as authSagas from './auth' 
import * as categoriaSagas from './categoria'
 
export default function* rootSaga() {
    console.log('rootSaga')
    yield all([   
        ...Object.values(authSagas),  
        ...Object.values(categoriaSagas),  
    ].map(fork))
}