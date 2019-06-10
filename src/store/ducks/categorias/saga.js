import { delay } from 'redux-saga';
import { takeLatest, put, call, select } from 'redux-saga/effects';

function apiGet(text, length) {
   
}

function* getTodoList() {
  try {
    const response = yield call(apiGet); 
    yield put({ type: 'SUCCESS_TODO_LIST', payload: { data: response } });
  } catch (err) {
    yield put({ type: 'FAILURE_TODO_LIST' });
  }
}

export default function* root() {
  yield [
    takeLatest('REQUEST_TODO_LIST', getTodoList),
  ];
}
