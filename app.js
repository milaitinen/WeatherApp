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

app.get('/weather', function(req, res) {
    // noinspection JSAnnotator
    connection.query(
        `SELECT id, name, MAX(temperature) AS temperature, postedTime, maxtemperature, mintemperature  FROM
            ((SELECT L.id, L.name, W2.temperature, W2.postedTime, maxtemperature, mintemperature 
                    FROM location L
                LEFT OUTER JOIN
                    (SELECT cityID, MAX(postedTime) AS currentPostedTime FROM weatherInfo GROUP BY cityID) W1
                        ON L.id = W1.cityID
                INNER JOIN
                    (SELECT cityID, temperature, postedTime FROM weatherInfo) W2
                        ON W1.cityID=W2.cityID AND currentPostedTime=postedTime
                LEFT OUTER JOIN
                    (SELECT cityID, MIN(temperature) as mintemperature FROM weatherInfo 
                        WHERE postedTime >= now() - INTERVAL 1 DAY GROUP BY cityID) MNT
                        ON W1.cityID=MNT.cityID
                LEFT OUTER JOIN
                    (SELECT cityID, MAX(temperature) as maxtemperature FROM weatherInfo 
                        WHERE postedTime >= now() - INTERVAL 1 DAY GROUP BY cityID) MXT
                        ON W1.cityID=MXT.cityID)
                ORDER BY L.id
            ) W3 GROUP BY id, postedTime, name`, function(err, rows) {if (err) throw err; res.json(rows)})
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