//regex have a property called source (the string the regex was created from)
// and lastIndex can controle where the next match will start
// those regex must have g or sticky y enabled

let pattern = /y/g;
pattern.lastIndex = 3;
let match = pattern.exec("xyzzy");
console.log(match.index);
// 4
console.log(pattern.lastIndex); //if match successful -> lastIndex gets updated
// 5

//g looks beforehand; y (sticky) match only succeeds if it starts directly at lastIndex
let global = /abc/g;
console.log(global.exec("xyz abc"));
// abc
let sticky = /abc/y;
console.log(sticky.exec("xyz abc"));
// null

// updates to lastIndex (which just happens) can cause problems
let digit = /\d/g;
console.log(digit.exec("here it is 1: "));
// 1
console.log(digit.exec("and now: 1 gets zero"));
// null

// match, when used with g, returns an array with all matches. Otherwise the return looks similar to exec
console.log("Banana".match(/an/g));
// ["an", "an"]