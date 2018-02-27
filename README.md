# WeatherApp

A simple application which uses React, Express and PostreSQL. The application lets the user post temperature measurements from five different locations: Tokyo, Helsinki, Amsterdam, Dubai, and New York. In addition to the most recently posted temperature, the application displays the highest and the lowest temperatures from the last 24 hours.

The application can be tested at https://fast-headland-99794.herokuapp.com.

## Quick start

1. Create a PostgreSQL database, and run `schema.sql` to create the schema and some initial weather data.
2. Open `environment.sh` and add the PostgreSQL url of your database. Then run `source environment.sh`.
3. To run the application, first run `yarn install` and then `yarn start` in the root of the project.
4. Repeat step 3 in the `client` directory. 

Your browser should automatically open `localhost:3000`, otherwise open it yourself.

