
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { application } = require('express');
const server = express();
server.use(cors());
const axios = require('axios');

//import weather data
const weatherData = require('./data/weather.json');

const PORT = process.env.PORT;
const weatherApiKey = process.env.WEATHER_API_KEY;


class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = 'Low of ' + obj.low_temp + ', High of ' + obj.high_temp +  ' with ' + obj.weather.description.toLowerCase();
  }
}


//--------------live weather does not run currently 7/21 12:50am---------------------

// server.get('/weather', (request, response) => {
//   let {lat, lon, searchQuery} = request.query;
//   let url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${request.query.lat}&lon=${request.query.lon}&key=${weatherApiKey}`;

//   axios.get(url).then(response => {

//     let data = response.data[0];
    
//     // let city = data.find(city => {
//     //   return city.city_name.toLowerCase() === searchQuery.toLowerCase();
//     // });
  
//     if (response) {
//       // create forecast objects for each forecast in city.data
//       let forecastArray = city.data.map(forecast => new Forecast(forecast));
//       response.send(forecastArray);
//     } else {
//       response.status(404).send('City not found');
//     }

//   });

// });


//------------------server.get runs currently 7/21 12:24am--------------------------

server.get('/weather', (request, response) => {
 console.log(request.query);
  let {lat, lon, searchQuery} = request.query;

  if (!lat || !lon || !searchQuery) {
    throw new Error('Please send lat, lon, and search query as a query string.');
  }

  // find appropriate value from weatherData
  //use Search Query to find an object within data
  let city = weatherData.find(city => {
    return city.city_name.toLowerCase() === searchQuery.toLowerCase();
  });

  if (city) {
    // create forecast objects for each forecast in city.data
    let forecastArray = city.data.map(forecast => new Forecast(forecast));
    response.send(forecastArray);
  } else {
    response.status(404).send('City not found');
  }
});



// error handling ------------------------------------------------------------------

  server.use('*', (error, request, response, next) => {
    response.status(500).send(error);
  });

  server.use('*', (request, response) => {
    response.status(404).send('Route not found');
  });

  server.listen(PORT, () => {
  console.log('Server is running on port :: ' + PORT);
  });
