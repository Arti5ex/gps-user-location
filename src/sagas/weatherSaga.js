import { put, takeEvery, all, fork, call } from 'redux-saga/effects'
import { fetchWeather } from './api';

const getCoords = () => {
  return new Promise(
    resolve => {
      navigator.geolocation.getCurrentPosition(position => resolve(position));
    });
}

const requestWeatherSuccess = (data) => {
  return { type: 'WEATHER_FETCH_SUCCEEDED', payload: data }
}

function* getWeather() {
   try {
    var result = [];
    let coords = localStorage.getItem("coords");

    if(coords && JSON.parse(coords).length > 0) {
      result = JSON.parse(coords);
    } else {
      if (navigator.geolocation) {
        result = yield call(getCoords);
        result = [result.coords.latitude, result.coords.longitude];
        localStorage.setItem("coords", JSON.stringify(result));
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    const data = yield call(() => fetchWeather(result[0], result[1]));
    yield put(requestWeatherSuccess(data));
  } catch (e) {
    console.error(e.message);
    yield put({type: "WEATHER_SET_FAILED"});
  }
}

function* getWatcher() {
  yield takeEvery("WEATHER_FETCH", getWeather);
}

export default function* weatherSagas() {
  yield all([
    fork(getWatcher)
  ])
}
