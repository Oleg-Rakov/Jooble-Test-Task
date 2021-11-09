import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getWeather } from '../../redux/weather-reducer';
import style from './style.module.css';

class History extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <h1>Search history</h1>
        <div className={style.wrapper}>
          {this.props.history
            .slice(0, 10)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item) => {
              return (
                <div key={item.date}>
                  <span
                    onClick={() => this.props.getWeather(item.city)}
                    className={style.item_city}
                  >
                    {item.city}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (state) => {
  console.log(state);
  return {
    history: state.weather.history,
  };
};

export default compose(connect(mapStateToProps, { getWeather }))(History);
