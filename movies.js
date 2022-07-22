const axios = require('axios');
const movieApiKey = process.env.MOVIE_API_KEY;

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.vote_average= movie.vote_average;
    this.vote_count = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }

  static getMovies(cityName, cityExRes){

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${cityName}&include_adult=false`;
    console.log(url);
  
    axios.get(url).then(res => {
      console.log(res);
      const movieArray = res.data.results.map(movie => new Movie(movie));
      cityExRes.send(movieArray);
    });
  }
}

  module.exports = Movie;