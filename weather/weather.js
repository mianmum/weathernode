const request = require('request');

const getWeather = (lat, long, callback) => {
  request({
    url: `https://api.darksky.net/forecast/791565c3906abee9a6323f394d00b8be/${lat},${long}?units=si`,
    json: true
  },
  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
    else {
      callback('Could not fetch weather...');
    };
  });
};

module.exports = { getWeather };
