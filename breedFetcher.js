const request = require('request');

const makeRequest = (url, callback) => {
  request(url, (error, response, body) => {
  const data = callback(body);
  console.log(data)
  return data;
});}

const fetchBreedDescription = (breedName, callback) => {
  const url = 'https://api.thecatapi.com/v1/breeds/search?q=' + breedName;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      if (body === '[]') {
        error = 'Breed not found';
        callback(error, null);
        return;
      }
      const jsonParsed = JSON.parse(body)
      callback(error, jsonParsed);
      console.log(jsonParsed[0].description)
    }
  });
}

module.exports = fetchBreedDescription;