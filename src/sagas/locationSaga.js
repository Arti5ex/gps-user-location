import { put, takeEvery, all, fork, call } from 'redux-saga/effects'

const getCoords = () => {
  return new Promise(
    resolve => {
      navigator.geolocation.getCurrentPosition(position => resolve(position));
    });
}

function* getLocation() {
  try {
  } catch (e) {
    console.error(e.message);
    yield put({type: "LOCATION_GET_FAILED"});
  }
}

function* setLocation() {
  try {
  } catch (e) {
    console.error(e.message);
    yield put({type: "LOCATION_SET_FAILED"});
  }
}

function* getWatcher() {
  yield takeEvery("LOCATION_GET", getLocation);
}

function* setWatcher() {
  yield takeEvery("LOCATION_SET", setLocation);
}

export default function* weatherSagas() {
  yield all([
    fork(getWatcher),
    fork(setWatcher),
  ])
}
