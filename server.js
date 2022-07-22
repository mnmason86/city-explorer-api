
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
  constructor(title, overview, averageVotes, totalVotes, imageUrl, popularity, releasedOn) {
    this.title = title;
    this.overview = overview;
    this.average_votes = averageVotes;
    this.total_votes = totalVotes;
    this.image_url = imageUrl;
    this.popularity = popularity;
    this.released_on = releasedOn;
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

//-----------------------get movie info---------------------------

server.get ('/movies', (request, response) => {

  let url = `https://api.themoviedb.org/3/movie?api_key=${movieApiKey}&query=${request.query}&include_adult=false`;
  console.log(url);
  
  axios.get(url).then(res => {

    const movieArray = res.results.map(movie => new Movie(movie));
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
