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

/**
 * Function that returns command line arguments in Node
 * @param {boolean} argumentsOnly Set to `true` to only return the
 * arguments that were provided in the command line
 * @returns {Array} The arguments
 */
const argV = (argumentsOnly) => argumentsOnly ? process.argv.slice(2) : process.argv;

const commandLineArgs = argV(true);
const breedRequested = commandLineArgs[0];
const url = 'https://api.thecatapi.com/v1/breeds/search' + '?q=' + breedRequested;
makeRequest(url)
  .then((responseBody) => parseJSON(responseBody))
    .then((parsedJSON) => console.log(parsedJSON))
  .catch((error) => console.log(error))
  .finally(() => console.log('🐱🐱 MEOW 🐱🐱 All done!'));