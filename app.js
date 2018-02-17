const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'minnalaitinen',
    password: 'awesomeWeatherApp',
    database: 'weatherDB'
});

const PORT = process.env.PORT || 3001;

// Parse incoming request bodies in a middleware
app.use(bodyParser.json());

// HTTP request logger middleware
app.use(morgan('dev'));

/*
app.get('/dbtest', function(req, res) {
    connection.query('SELECT 1', function(err, rows) {res.json({ result: rows })})
});
*/

// fetch city names and id
app.get('/cities', (req, res) => {
   connection.query(
       'SELECT * FROM location;',
       (err, rows) => {if (err) throw err; res.json(rows)}
       )
});

// fetch the most resent post(s) of the given city id
app.get('/cities/:id', (req, res) => {
    connection.query(
        `SELECT temperature, postedTime FROM weatherInfo WHERE cityID = ${req.params.id} AND postedTime = 
            (SELECT MAX(postedTime) FROM weatherInfo WHERE cityID = ${req.params.id})`,
        (err, rows) => {if (err) throw err; res.json(rows)}
    )
});

// fetch max temperature of the city by within the past 24h
// return an empty array if no post has been made within the day
app.get('/cities/:id/maxTemperature', (req, res) => {
    connection.query(
        `SELECT MAX(temperature) AS max FROM weatherInfo W
            WHERE W.postedTime > DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND cityID=${req.params.id}`,
        (err, rows) => {if (err) throw err; res.json(rows)}
    )
});

// fetch minimum temperature of the city by id within the past 24h
app.get('/cities/:id/minTemperature', (req, res) => {
    connection.query(
        `SELECT MIN(temperature) AS min FROM weatherInfo W
            WHERE W.postedTime > DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND cityID=${req.params.id}`,
        (err, rows) => {if (err) throw err; res.json(rows)}
    )
});

app.post('/weather', function(req, res) {
    console.log('req.body', req.body);
    connection.query(
        'INSERT INTO weatherInfo (cityID, temperature) VALUES (?,?)',
        [req.body.cityID, req.body.temperature],
        function(err, rows) {if (err) throw err; res.json(rows)}
    )
});


app.listen(PORT);