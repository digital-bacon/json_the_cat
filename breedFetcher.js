const request = require('request');
const inspect = require('util').inspect;

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error) {
        return resolve(body);
      }
      return reject(error);
    });
  });
};

const parseJSON = (stringJSON) => {
  return new Promise((resolve, reject) => {
    try {
      const data = JSON.parse(stringJSON);
      return resolve(data);
    } catch (error) {
      return reject(error);
    };
  });
}

// const isValidJSON = (stringJSON) => {
//   try {
//     JSON.parse(stringJSON);
//     return true;
//   } catch {
//     return false;
//   }
// }
const url = 'https://api.thecatapi.com/v1/breeds/search?q=bengal';
makeRequest(url)
  .then((responseBody) => parseJSON(responseBody))
    .then((parsedJSON) => console.log(parsedJSON))
  .catch((error) => console.log(error))
  .finally(() => console.log('🐱🐱 MEOW 🐱🐱 All done!'));