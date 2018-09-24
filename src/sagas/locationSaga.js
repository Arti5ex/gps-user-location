import { put, takeEvery, all, fork, call } from 'redux-saga/effects'

const getCoords = () => {
  return new Promise(
    resolve => {
      navigator.geolocation.getCurrentPosition(position => resolve(position));
    });
}

function* getLocation() {
  try {
    const coords = localStorage.getItem("coords");
    if(coords && JSON.parse(coords).length > 0) {
      return JSON.parse(coords);
    } else {
      yield put({type: "LOCATION_SET"});
    }
  } catch (e) {
    console.error(e.message);
    yield put({type: "LOCATION_GET_FAILED"});
  }
}

function* setLocation() {
  try {
    if (navigator.geolocation) {
      let result = yield call(getCoords);
      result = [result.coords.latitude, result.coords.longitude];
      localStorage.setItem("coords", JSON.stringify(result));
      return result;
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
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
