const express = require('express');
const request = require('request');
const endpoints = require('./endpoints.js');
const mappers = require('./mappers.js');

const app = express();

const port = 3500;

app.listen(process.env.PORT || port, () => {
    const usedPort = process.env.PORT || port;
    console.log('Listening on port: ' + usedPort);
});

app.get('/season-schedule', (req, res) => {
    request.get(endpoints.seasonSchedule, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(mappers.mapRaces(JSON.parse(body)));
    });
});

app.get('/driver-standings', (req, res) => {
    request.get(endpoints.driverStandings, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(mappers.mapDriverStandings(JSON.parse(body)));
    });
});

app.get('/constructor-standings', (req, res) => {
    request.get(endpoints.constructorStandings, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(mappers.mapConstructorStandings(JSON.parse(body)));
    });
});