const APP_ID = 'f070e89a215605505aa533695a557db1';
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/';

export const fetchWeather = (lat, lon) => {
  return fetch(WEATHER_API + 'weather?lat=' + lat + '&lon=' + lon + '&APPID=' + APP_ID, {
    method: 'GET',
    mode: 'cors',
  })
  .then(res => res.json())
  .catch(error => 
    console.log(error)
  );
}