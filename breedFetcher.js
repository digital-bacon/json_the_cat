const request = require('request');

const fetchBreedDescription = (breedName, callback) => {
  const url = 'https://api.thecatapi.com/v1/breeds/search?q=' + breedName;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      if (body === '[]') {
        return callback(null, 'Breed not found');
      } else {
        const jsonParsed = JSON.parse(body);
        const breedDescription = jsonParsed[0].description;
        return callback(null, breedDescription);
      }
    }
  });
};

module.exports = fetchBreedDescription;