import * as axios from 'axios';

let API_KEY = 'dd98583bbdb988a4097e32259677832a&units=metric';

let instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});

export let weatherAPI = {
  getWeather(city) {
    return instance.get(`weather?q=${city}&appid=${API_KEY}`);
  },
};
