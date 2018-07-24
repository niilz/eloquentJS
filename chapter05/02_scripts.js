// var SCRIPTS:
require('./02_scriptsdata.js')

let rtlScripts = SCRIPTS.filter(script => script.direction == "rtl");
//console.log(rtlScripts.map(script => script.name));

function charCount(script) {
    return script.ranges.reduce((count, [from, to]) => count + (to - from), 0);
}
//console.log(SCRIPTS.map(script => charCount(script)));

// console.log(SCRIPTS.reduce((biggestScript, nextScript) => {
//     return charCount(nextScript) > charCount(biggestScript) ? nextScript : biggestScript;
// }));

function average(array) {
    return array.reduce((sum, el) => sum + el) / array.length;
}

console.log(Math.round(average(
    SCRIPTS.filter(script => script.living).map(script => script.year)
)));

console.log(Math.round(average(
    SCRIPTS.filter(script => !script.living).map(script => script.year)
)));