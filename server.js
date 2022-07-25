'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
const PORT = process.env.PORT;

const weather = require('./weather');
const movies = require('./movies');
const { response } = require('express');

//endpoints -------------------------------------------------------------------------

server.get ('/weather', handleWeather);
server.get ('/movies', handleMovies);

// data handling-----------------------------------------------------------------------

function handleMovies(cityExReq, cityExRes) {
 
  let cityName = cityExReq.query.city;
  movies(cityName)
  .then(moviesArray => cityExRes.send(moviesArray))
  .catch((error) => {
    console.log(error);
    cityExRes.status(500).send(error);
  });
}

function handleWeather(cityExReq, cityExRes) {
  const {lat,lon} = cityExReq.query;
  console.log(lat,lon);
  weather(lat,lon)
  .then (forecasts => cityExRes.send(forecasts))
  .catch((error) => {
    console.log(error);
    cityExRes.status(500).send('Something went wrong');
  });
}
// error handling ------------------------------------------------------------------

  server.use('*', (error, request, response, next) => {
    response.status(500).send(error);
    console.log('server ping');
  });

  server.use('*', (request, response) => {
    response.status(404).send('Route not found');
  });

// listener --------------------------------------------------------------------------
  server.listen(PORT, () => {
  console.log('Server is running on port :: ' + PORT);
  });
