const request = require("request");

const darkSkyURL1 = "https://api.darksky.net/forecast/f5bea481371b8d937b42619caf26c2e9/";
const darkSkyURL2 = "?units=si";

const forecast = (latitude, longitude , callback) => {
    if(latitude === undefined || longitude === undefined){
        console.log("Object not supported");
    }
    else{
        request({
            url: darkSkyURL1 + latitude + "," + longitude + darkSkyURL2,
            json: true
        }, (error, { body }) => {
            if(error){
                callback("Unable to connect to Dark Sky service", undefined);
            }
            else if(body.error){
                callback("Unable to find location", undefined);
            }
            else{
                callback(undefined, `${body.currently.summary}. It's ${body.currently.temperature} C° out there, but fells like ${body.currently.apparentTemperature}.
                 The humidity is at ${body.currently.humidity} and there's ${body.currently.precipProbability} % of rain.`);
            }
        });
    }
};

module.exports = forecast;