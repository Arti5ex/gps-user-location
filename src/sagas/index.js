import { fork, all } from 'redux-saga/effects';

import weatherSaga from './weatherSaga'

export default function* root() {
  yield all([
    fork(weatherSaga)
  ])
}