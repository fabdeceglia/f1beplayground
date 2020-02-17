const lodash = require('lodash/fp');

function mapRacesFromMrData(races) {
    return lodash.get('MRData.RaceTable.Races')(races);   
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