const request = require("request");

const geoURL1 = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
const geoURL2 = ".json?access_token=pk.eyJ1IjoiYWxleGFuZHJlY29yZGEiLCJhIjoiY2s2N3h6YnNzMGdsYTNxbnd2b3BjZTdqcyJ9.ciksC4DiE5Y-XzO3SaPZSg&limit=1";

const geocode = (address, callback) => {
    request({
        url: geoURL1 + encodeURIComponent(address) + geoURL2,
        json: true
    }, (error, { body }) => {
        if(error){
            callback("Unable to connect to geocode service", undefined);
        }
        else if(body.features.length === 0){
            callback("Unable to find location", undefined);
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;