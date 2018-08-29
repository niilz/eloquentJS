// Promise class can be called with .resolve (it's value is wrapped in a promise)
// if it is already a promise it's returned, else it creates a new promise which finishes with that result

let fifteen = Promise.resolve(15);
fifteen.then(value => consele.log(`Got ${value}`)); // errors out with "DeprecatedWarning"
// Got 15