import { weatherAPI } from '../api/api';

const SET_WEATHER = 'SET_WEATHER';
const SET_CITY = 'SET_CITY';
const SET_HISTORY = 'SET_HISTORY';
const SET_ERROR_FROM_SEARCH = 'SET_ERROR_FROM_SEARCH';

const initialState = {
  weather: 0,
  city: '',
  history: [],
  errorFromSearch: false,
};

const weatherReducer = (state = initialState, action) => {
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
          { id: action.id, city: action.city, date: Date.now() },
          ...state.history,
        ]
          .slice(0, 10)
          .sort((a, b) => new Date(b.date) - new Date(a.date)),
      };
    case SET_ERROR_FROM_SEARCH:
      return {
        ...state,
        errorFromSearch: action.error,
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

export const setErrorFromSearch = (error) => ({
  type: SET_ERROR_FROM_SEARCH,
  error,
});

export const getWeather = (city) => {
  return async (dispatch) => {
    try {
      dispatch(setErrorFromSearch(false));
      const data = await weatherAPI.getWeather(city);
      dispatch(setWeather(Math.floor(data.data.main.temp)));
      dispatch(setCity(data.data.name));
      dispatch(setHistory(data.data.id, data.data.name));
    } catch (error) {
      dispatch(setErrorFromSearch(true));
      console.error(error);
    }
  };
};

export default weatherReducer;
