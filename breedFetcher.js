const request = require('request');

const makeRequest = (url) => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      const data = {error, response, body};
      if (!error) {
        return resolve(data);
      }
      return reject(error);
    });
  });
};

const parseJSON = (stringJSON) => {
  try {
    const data = JSON.parse(stringJSON);
    return data;
  } catch (error) {
    return error;
  }
}

const isCatAPIBreedFound = (requestBody) => {
  // The CatAPI returns an empty object if there's an error
  const breedWasFound = requestBody !== '[]';
  return breedWasFound;
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
  .then((requestData) => {
    const breedWasFound = isCatAPIBreedFound(requestData.body);
    if (breedWasFound === false) {
      console.log(`nothing was returned`);
    } else {
      const parsedJSON = parseJSON(requestData.body);
      console.log(parsedJSON)
    }
  })
  .catch((error) => console.log(`there was an error: ${error}`))
  .finally(() => console.log('🐱🐱 MEOW 🐱🐱 All done!'));