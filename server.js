const express = require('express');
const app = express();
const mongoose = require('mongoose');
const moment = require('moment');
const morgan = require('morgan')
const db = mongoose.connection

// Environment Variables
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/football_app';
const PORT = process.env.PORT || 3000;

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true },
    () => console.log('MongoDB connection established:', mongoURI)
);

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'));
db.on('disconnected', () => console.log('mongo disconnected'));

// Middleware
app.use(express.urlencoded({ extended: false }))    // extended: false - does not allow nested objects in query strings
app.use(express.json())                             // returns middleware that only parses JSON
app.use(express.static('public'))                   //static files
app.use(morgan('tiny'))                             //// Use morgan


// Routes
const footballController = require('./controllers/football.js');
app.use('/TacosFantasyFootball', footballController);

// this will catch any route that doesn't exist
app.get('*', (req, res) => {
    res.status(404).json('Sorry, page not found')
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT)
})
