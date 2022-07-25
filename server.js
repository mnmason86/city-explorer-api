
require('dotenv').config();
const express = require('express');

const cors = require('cors');
const { application } = require('express');

const server = express();
server.use(cors());

const axios = require('axios');
const PORT = process.env.PORT;

const Forecast = require('./weather');
const Movie = require('./movies');

// weather endpoint

server.get ('/weather', (request, response) => {
   Forecast.handleForecast(request.query.lat, request.query.lon, response);
}); 
  

// movie endpoint

server.get ('/movies', (request, response) => {
    Movie.handleMovies(request.query.city_name,response);
});
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
