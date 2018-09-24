const rp = require('request-promise');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.a);
const geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyB7hY6GzXHFkMp9TcHTLIhjodbizi2j_jk&address=${encodedAddress}`;

const options = {
    uri: geocodeURL,
    qs: {
        access_token: 'xxxxx xxxxx' // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
};

rp(options)
  .then(res => {
    return {
      address: res.results[0].formatted_address,
      latitude: res.results[0].geometry.location.lat,
      longitude: res.results[0].geometry.location.lng
    };
  })
  .then(res => {
    weather.getWeather(res.latitude, res.longitude, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else if (weatherResults) {
        console.log(`The temperature in ${res.address} is currently ${weatherResults.temperature}° Celsius. It feels like ${weatherResults.apparentTemperature}° Celsius.`);
      };
    });
  })
