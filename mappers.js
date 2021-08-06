const lodash = require('lodash/fp');
const moment = require('moment');

function mapRacesFromMrData(races) {
    const extractedRaces = lodash.get('MRData.RaceTable.Races')(races);
    const mappedRaces = lodash.map((race) => {
        return {
            raceName: race.raceName,
            circuitName: race.Circuit.circuitName,
            country: race.Circuit.Location.country,
            locality: race.Circuit.Location.locality,
            date: moment(race.date).format("dddd, MMMM Do YYYY"),
        }
    })(extractedRaces);
    return mappedRaces;   
}

function mapDriverStandingsFromMrData(driverStandings) {
    return lodash.get('DriverStandings')(lodash.first(lodash.get('MRData.StandingsTable.StandingsLists')(driverStandings)));
}

function mapConstructorStandingsFromMrData(constructorStandings) {
    return lodash.get('ConstructorStandings')(lodash.first(lodash.get('MRData.StandingsTable.StandingsLists')(constructorStandings)));
}

module.exports = {
    mapRaces: mapRacesFromMrData,
    mapDriverStandings: mapDriverStandingsFromMrData,
    mapConstructorStandings: mapConstructorStandingsFromMrData
}