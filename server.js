const express = require('express');
const request = require('request');
const endpoints = require('./endpoints.js');
const tgbMappers = require('./tgbMappers.js');

const app = express();

const port = 3500;

app.listen(process.env.PORT || port, () => {
    const usedPort = process.env.PORT || port;
    console.log('Listening on port: ' + usedPort);
});

app.get('/tgb/season-schedule', (req, res) => {
    request.get(endpoints.seasonSchedule, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(tgbMappers.mapRaces(JSON.parse(body)));
    });
});

app.get('/tgb/driver-standings', (req, res) => {
    request.get(endpoints.driverStandings, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(tgbMappers.mapDriverStandings(JSON.parse(body)));
    });
});

app.get('/tgb/constructor-standings', (req, res) => {
    request.get(endpoints.constructorStandings, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(tgbMappers.mapConstructorStandings(JSON.parse(body)));
    });
});