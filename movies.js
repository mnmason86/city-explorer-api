'use strict';

const axios = require('axios');
const movieApiKey = process.env.MOVIE_API_KEY;
let cache = require('./cache.js');


class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.vote_average= movie.vote_average;
    this.vote_count = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
    this.timestamp = Date.now();
  }
}
  function fetchMovies(cityName){

    const key = 'movies-' + cityName;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${cityName}&include_adult=false`;

    if(cache[key] && (Date.now() - cache[key].timestamp < 120000)) {
      console.log('Movie cache hit');
    } else {
      console.log('Movie cache miss, fetching')
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = axios.get(url)
      .then(movieData => parseMovieData(movieData.data));
    } 
    return cache[key].data;
  }
  
 
  function parseMovieData(data) {
    try {
      const movies = data.results.map(movie => {
        return new Movie(movie);
      });
      return Promise.resolve(movies);
    } catch(error) {
      return Promise.reject(error);
    }
  }

  module.exports = fetchMovies;