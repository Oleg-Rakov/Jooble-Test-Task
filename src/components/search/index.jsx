import React from 'react';
import style from './style.module.css';
import search from '../../assets/images/search.svg';
import { getWeather } from '../../redux/weather-reducer';
import { getSearchValue } from '../../redux/search-reducer';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Search extends React.Component {
  componentDidMount() {
    this.props.getWeather('Kyiv');
  }
  render() {
    return (
      <div className={style.container}>
        <h1>Weather Forecast</h1>
        <div className={style.wrapper}>
          <div className={`${style.searchBlock} ${style.item}`}>
            <img className={style.searchImg} src={search} alt="search" />
            <input
              onChange={(e) => this.props.getSearchValue(e.target.value)}
              value={this.props.search}
              className={style.searchInput}
              type="text"
              placeholder="Enter city..."
            />
          </div>
          <div className={`${style.searchButton} ${style.item}`}>
            <button
              onClick={() => {
                this.props.getWeather(this.props.search);
              }}
            >
              Search
            </button>
          </div>
          <div className={`${style.searchResult} ${style.item}`}>
            {!this.props.error ? (
              <span>
                {`${this.props.city}`} (Today): {`${this.props.weather}°C`}
              </span>
            ) : (
              <span>Please enter the correct city name</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    weather: state.weather.weather,
    city: state.weather.city,
    search: state.search.searchValue,
    error: state.weather.errorFromSearch,
  };
};

export default compose(
  connect(mapStateToProps, { getWeather, getSearchValue })
)(Search);
