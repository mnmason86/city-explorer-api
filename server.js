
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { application } = require('express');
const server = express();
server.use(cors());
const axios = require('axios');

const PORT = process.env.PORT;
const weatherApiKey = process.env.WEATHER_API_KEY;
const movieApiKey = process.env.MOVIE_API_KEY;

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = 'Low of ' + obj.low_temp + ', High of ' + obj.high_temp +  ' with ' + obj.weather.description.toLowerCase();
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.vote_average= movie.vote_average;
    this.vote_count = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

//----------------------get weather info--------------------------

server.get ('/weather', (request, response) => {

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?days=3&lat=${request.query.lat}&lon=${request.query.lon}&key=${weatherApiKey}`;
  
  axios.get(url).then(res => {

      const weatherArray = res.data.data.map(forecast => new Forecast(forecast));
      response.send(weatherArray);
      
  });
});    
 
//-----------------------get movie info------------------------------

server.get ('/movies', (request, response) => {
console.log(request.query.city_name);
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${request.query.city_name}&include_adult=false`;
  console.log(url);

  axios.get(url).then(res => {
    console.log(res);
    const movieArray = res.data.results.map(movie => new Movie(movie));
    response.send(movieArray);
  });
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
