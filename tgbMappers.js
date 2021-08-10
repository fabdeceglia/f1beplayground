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
    const extractedDriverStandings = lodash.get('DriverStandings')(lodash.first(lodash.get('MRData.StandingsTable.StandingsLists')(driverStandings)));
    const mappedDriverStandings = lodash.map((driverStanding) => {
        const driver = driverStanding.Driver;
        const constructor = lodash.first(driverStanding.Constructors) ;
        return {
            givenName: driver.givenName,
            familyName: driver.familyName,
            constructor: constructor.name,
            points: driverStanding.points
        }
    })(extractedDriverStandings);
    return mappedDriverStandings;
}

function mapConstructorStandingsFromMrData(constructorStandings) {
    const extractedConstructorStandings = lodash.get('ConstructorStandings')(lodash.first(lodash.get('MRData.StandingsTable.StandingsLists')(constructorStandings)));
    const mappedConstructorStandings = lodash.map((constructorStanding) => {
        return {
            points: constructorStanding.points,
            name: constructorStanding.Constructor.name
        }
    })(extractedConstructorStandings);
    return mappedConstructorStandings;
}

module.exports = {
    mapRaces: mapRacesFromMrData,
    mapDriverStandings: mapDriverStandingsFromMrData,
    mapConstructorStandings: mapConstructorStandingsFromMrData
}