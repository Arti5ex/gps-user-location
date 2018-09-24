export default (state = {
  weather: {},
}, action) => {
  switch (action.type) {
    case 'WEATHER_FETCH_SUCCEEDED': {
      return {
        ...state,
        weather: action.payload
      }
    }
    case 'WEATHER_FETCH_FAILED': {
      return {
        ...state,
        weather: {}
      }
    }
    default:
      return state
  }
}
