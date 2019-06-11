import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
 
import reducers from  './reducers'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

export default createStore(
  combineReducers({
    reducers,
  }),
  applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(sagas)
