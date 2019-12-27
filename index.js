const express = require('express');
const request = require('request');
const app = express();
const port = 3500;


const raceListEndpoint = 'http://ergast.com/api/f1/current.json';


app.listen(port, () => {
    console.log('Listening on port: ' + port);
})

app.get('/race-list', (req, res) => {
    request.get(raceListEndpoint, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(JSON.parse(body));
    });
})