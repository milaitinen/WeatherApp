const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pgp = require('pg-promise')(/*options*/)
const db = pgp('postgres://minna:awesomeWeatherApp@localhost:5432/weatherdb')

const PORT = process.env.PORT || 3001;

// Parse incoming request bodies in a middleware
app.use(bodyParser.json());

// HTTP request logger middleware
app.use(morgan('dev'));

// for testing connection
app.get('/dbtest', (req, res) => {
    db.one('SELECT 1')
        .then(() => res.json({ result: 'connection successful'}))
        .catch(err => res.json({ error: err }));
});


// fetch city names and id
app.get('/measurements', (req, res) => {
   db.query(
       `WITH city AS (
            SELECT * FROM location
        ), recentTemp AS (
            SELECT MAX(postedTime) AS postedTime, cityID FROM weatherinfo, city 
                WHERE cityID = city.id GROUP BY cityID
        ), allTemp AS (
            SELECT W1.cityID, temperature, W1.postedTime FROM weatherinfo AS W1, recentTemp AS R 
                WHERE W1.postedTime = R.postedTime AND W1.cityID = R.cityID
        ), maxTemp AS (
            SELECT cityID, MAX(temperature) AS maxtemperature FROM weatherinfo, city 
                WHERE postedTime > current_timestamp - interval '1 day' AND cityID=city.id GROUP BY cityID 
        ), minTemp AS (
            SELECT cityID, MIN(temperature) AS mintemperature FROM weatherinfo, city 
                WHERE postedTime > current_timestamp - interval '1 day' AND cityID=city.id GROUP BY cityID 
        ) 
        
        SELECT DISTINCT city.id, city.name, allTemp.temperature, allTemp.postedTime, maxtemperature, mintemperature FROM (
            city LEFT OUTER JOIN recentTemp ON city.id = recentTemp.cityID 
                LEFT OUTER JOIN allTemp ON recentTemp.cityID = allTemp.cityID AND recentTemp.postedTime = allTemp.postedTime
                LEFT OUTER JOIN maxTemp ON recentTemp.cityID = maxTemp.cityID
                LEFT OUTER JOIN minTemp ON recentTemp.cityID = minTemp.cityID
        ) ORDER BY city.id;`
   )
       .then(rows => res.json(rows))
       .catch(err => res.json({ error: err }));
});

app.post('/city/:id/measurement', function(req, res) {
    console.log('req.body', req.body);
    db.one('INSERT INTO weatherinfo (cityID, temperature) VALUES ($1,$2)',
        [req.params.id, req.body.temperature])
        .then(rows => res.json(rows))
        .catch(err => res.json({ error: err }));
});


app.listen(PORT);