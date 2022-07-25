'use strict';

const axios = require('axios');
const weatherApiKey = process.env.WEATHER_API_KEY;
let cache = require('./cache.js')


class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = 'Low of ' + obj.low_temp + ', High of ' + obj.high_temp +  ' with ' + obj.weather.description.toLowerCase();
  }
}

  function fetchWeather(lat, lon) {
    const key = 'weather-' + lat + lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?days=3&lat=${lat}&lon=${lon}&key=${weatherApiKey}`;
    
    if(cache[key] && (Date.now() - cache[key].timestamp < 120000)) {
      console.log('Weather cache hit');
    } else {
      console.log('Weather cache miss, fetching');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(weatherData => parseWeatherData(weatherData.data));
    } 
    return cache[key].data;
  }


function parseWeatherData(weatherData) {
  try {
    const forecasts = weatherData.data.map(forecast => {
      return new Forecast(forecast);
    });
    return Promise.resolve(forecasts);
  } catch (error) {
    return Promise.reject(error);
  }
};


module.exports = fetchWeather;