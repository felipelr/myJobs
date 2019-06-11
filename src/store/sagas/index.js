import { all, fork } from 'redux-saga/effects'
 
import * as authSagas from './auth' 
 
export default function* rootSaga() {
    yield all([
        [   
            ...Object.values(authSagas),  
        ].map(fork)
    ])
}