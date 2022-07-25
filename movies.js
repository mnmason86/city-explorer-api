const axios = require('axios');
const movieApiKey = process.env.MOVIE_API_KEY;
const movieCache = {};


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

  static async getMovies(cityName, cityExRes){
    console.log('Getting initial movie data from API');
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${cityName}&include_adult=false`;
  
    axios.get(url).then(res => {
      const movieArray = res.data.results.map(movie => new Movie(movie));
      cityExRes.send(movieArray);
    });
  }

  static async handleMovies(cityExReq, cityExRes) {
 
    console.log('movie query attempt'); 

    let cityName = cityExReq;
    if (movieCache[cityName]) {
      console.log ('Data found in movie cache', movieCache);
      const movieArray = cityExRes.data.results.map(movie => Movie(movie));
      cityExRes.send(movieArray);
    } else {
      let movieResponse = await this.getMovies(cityName);
      console.log(movieResponse);
      console.log('Adding movie API data to cache');
      movieCache[cityName] = movieResponse.data;
      cityExRes.send(movieResponse);
    }
  }
}
  

  module.exports = Movie;