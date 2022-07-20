'use strict';
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');
const server = express();
server.use(cors());
const PORT = process.env.PORT;



