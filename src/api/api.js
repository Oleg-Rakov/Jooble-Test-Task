import * as axios from 'axios';

const API_KEY = 'dd98583bbdb988a4097e32259677832a&units=metric';

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export const weatherAPI = {
  getWeather(city) {
    return instance.get(`weather?q=${city}&appid=${API_KEY}`);
  },
};
