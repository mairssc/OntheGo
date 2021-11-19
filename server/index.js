//Running index.htm from client folder
//Ex: http://localhost:8080/index.html will run index.html

const express = require('express');
const bodyParser = require('body-parser');
const calendar = require('../models/calendar.js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var port = 8080;


//Mongoose
const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/onTheGo";

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log("Database connected")
})

db.on('error', (error) => {
    console.log(error)
})

//This is where we run CLIENTNNSNSNSNSNSN
app.use(express.static('../client'))

//routes
const calendarRoute = require('../route/calendar.js');
app.use('/calendar', calendarRoute);

const userTestRoute = require('../route/userTest.js');
app.use('/userTest', userTestRoute);

app.listen(port);
console.log('Server listening on port ' + port);