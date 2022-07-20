'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const server = express();
server.use(cors());
const PORT = process.env.PORT;

server.get('/hello', (request, response) => {
  console.log(request);
  response.send('hellO there');
});


server.listen(3000, () => {
  console.log(PORT);
});
