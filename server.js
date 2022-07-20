'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const server = express();
server.use(cors());
const PORT = process.env.PORT;


class Forecast {
  constructor(date,description) {
    this.date = date;
    this.description = description;
  }

  static getForecast(city) {
    const dailyForecast = city.data.map((element) => {
      const date = element.valid_date;
      const description = `Daily Low: ${element.low_temp}, ` + `Daily High: ${element.high_temp} ` + `with ${element.weatherData.description}`;
      return new Forecast (date, description);
    });
    return dailyForecast;
  }
}

function locate (name, lat, lon, weatherInfo) {
  try {
    const city = weatherInfo.find((element) => {
      return (
        name === element.city_name &&
        Math.floor(lat) === Math.floor(element.lat) &&
        Math.floor(lon) === Math.floor(element.lon)
      );
    });
    return city;
  } catch (error) {
    throw new Error('No data exists for this city' + error);
  }
}

// /weather API endpoint
server.get('/weather', (request, response) => {

  const cityData = locate(request.query.city_name, request.query.lat, request.query.lon, weatherData);
  console.log(cityData);
  if (cityData) {
    response.send('City Located');
  } else {
    response.status(404).send('No weather data exists for this city');
  }
  });


server.listen(PORT, () => {
  console.log('Server is running on port :: ' + PORT);
});
