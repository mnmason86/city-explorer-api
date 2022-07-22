
const axios = require('axios');
const weatherApiKey = process.env.WEATHER_API_KEY;

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = 'Low of ' + obj.low_temp + ', High of ' + obj.high_temp +  ' with ' + obj.weather.description.toLowerCase();
  }


static getForecast(lat, lon, cityExRes) {
  let url = `https://api.weatherbit.io/v2.0/forecast/daily?days=3&lat=${lat}&lon=${lon}&key=${weatherApiKey}`;
  
  axios.get(url).then(res => {

      const weatherArray = res.data.data.map(forecast => new Forecast(forecast));
      cityExRes.send(weatherArray);
      
    });
  }
}
module.exports = Forecast;