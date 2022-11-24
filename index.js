const fetchBreedDescription = require('./breedFetcher');

/**
 * Function that returns command line arguments in Node
 * @param {boolean} argumentsOnly Set to `true` to only return the
 * arguments that were provided in the command line
 * @returns {Array} The arguments
 */
 const argV = (argumentsOnly) => argumentsOnly ? process.argv.slice(2) : process.argv;

 const commandLineArgs = argV(true);
 const breedName = commandLineArgs[0];
 const callback = (error, desc) => {
  if (error) {
    console.log('Error fetch details:', error);
    return;
  } console.log(desc);
}
 
 fetchBreedDescription(breedName, callback);