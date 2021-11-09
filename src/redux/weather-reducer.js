import { weatherAPI } from '../api/api';

let SET_WEATHER = 'SET_WEATHER';
let SET_CITY = 'SET_CITY';
let SET_HISTORY = 'SET_HISTORY';

let initialState = {
  weather: 0,
  city: '',
  history: [],
};

let weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        weather: action.weather,
      };
    case SET_CITY:
      return {
        ...state,
        city: action.city,
      };
    case SET_HISTORY:
      return {
        ...state,
        history: [
          ...state.history,
          { id: action.id, city: action.city, date: Date.now() },
        ],
      };
    default:
      return state;
  }
};

export const setWeather = (weather) => ({
  type: SET_WEATHER,
  weather,
});

export const setCity = (city) => ({
  type: SET_CITY,
  city,
});

export const setHistory = (id, city) => ({
  type: SET_HISTORY,
  id,
  city,
});

export let getWeather = (city) => {
  return async (dispatch) => {
    try {
      let data = await weatherAPI.getWeather(city);
      dispatch(setWeather(Math.floor(data.data.main.temp)));
      dispatch(setCity(data.data.name));
    } catch (error) {
      alert('Enter the correct city name');
      console.error(error);
    }
  };
};

export let getHistory = (city) => {
  return async (dispatch) => {
    let data = await weatherAPI.getWeather(city);
    dispatch(setHistory(data.data.id, data.data.name));
  };
};

export default weatherReducer;
