
const axios = require('axios');
const weatherApiKey = process.env.WEATHER_API_KEY;
const weatherCache = {};


class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = 'Low of ' + obj.low_temp + ', High of ' + obj.high_temp +  ' with ' + obj.weather.description.toLowerCase();
  }


  static async getForecast(lat, lon, cityExRes) {
    console.log('Getting initial forecast data from API');
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?days=3&lat=${lat}&lon=${lon}&key=${weatherApiKey}`;
    
    axios.get(url).then(res => {

      const weatherArray = res.data.data.map(forecast => new Forecast(forecast));
      cityExRes.send(weatherArray);
      
    });
  }


static async handleWeather(cityExReq, cityExRes) {

  console.log('weather query attempt');  

    let cityName = cityExReq;
  
    if (weatherCache[cityName]) {
      console.log('Data found in weather cache', weatherCache);
      const weatherArray = cityExRes.data.data.map (forecast => new Forecast(forecast));
      cityExRes.send(weatherArray);
    } else {
      let weatherResponse = await this.getForecast(cityName);
      console.log('Adding weather API data to cache');
      weatherCache[cityName] = weatherResponse.data;
      cityExRes.send(weatherResponse);
    } 
  };
}

module.exports = Forecast;