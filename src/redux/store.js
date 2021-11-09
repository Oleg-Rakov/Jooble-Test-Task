import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import searchReducer from './search-reducer';
import weatherReducer from './weather-reducer';

let reducers = combineReducers({
  weather: weatherReducer,
  search: searchReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
window.store = store;

export default store;
