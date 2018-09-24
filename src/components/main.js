import React from 'react';
import { connect } from 'react-redux';

import { fetchWeather } from "../actions/weatherActions";

class Main extends React.Component {
  componentWillMount () {
    this.props.dispatch(fetchWeather());
  }

  render () {
    let { weather } = this.props;
    const title = weather.name ? 'Погода в ' + weather.name : '';

    return (
      <div className="container">
        {
          weather && (
            <div>
              <h2>{title}</h2>
              <div className="weather-row">
                {
                  weather.weather && weather.weather.length > 0 &&
                    weather.weather[0].description
                }
              </div>
              <div className="weather-row">
                {
                  weather.main && (
                    <span>Температура: {weather.main.temp}</span>
                  )
                }
              </div>
              <div className="weather-row">
                {
                  weather.wind && (
                    <span>Направление ветра: {weather.wind.deg}</span>
                  )
                }
              </div>
              <div className="weather-row">
                {
                  weather.wind && (
                    <span>Скорость ветра: {weather.wind.speed}</span>
                  )
                }
              </div>
              <div className="weather-row">
                {
                  weather.main && (
                    <span>Давление: {weather.main.pressure}</span>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    weather: store.weather.weather,
  }
}

export default connect(mapStateToProps)(Main) 
