import { fork, all } from 'redux-saga/effects';

import weatherSaga from './weatherSaga'
import locationSaga from './locationSaga'

export default function* root() {
  yield all([
    fork(weatherSaga),
    fork(locationSaga)
  ])
}