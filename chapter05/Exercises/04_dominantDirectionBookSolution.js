// var SCRIPTS:
require('../02_scriptsdata.js')

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code <= to
            })) {
            return script; //this return belongs to the if-statement. All the stuff from the if-keyword up to this return is just a statement (with an entire function in it)
        }
    }
    return null;
}

function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
        //loops over the given item-numbers
        let name = groupName(item);
        //defines the name by passing each item to the function, given as an argument
        let known = counts.findIndex(count => count.name == name);
        //defines known by checking for the index in the counts-array and returns the group-name, which will be "true" or "false", because of the given function below at logging
        if (known == -1) {
            //if this known is not yet in the counts-array it pushes it into the counts-array
            counts.push({name, count: 1}); //shortcut for {name: name, count: 1}
        } else {
            //otherwise it adds one to the count of this object with the already known name
            counts[known].count++;
        }
    }
    return counts;
}

//Code for Exercise starts here:
function dominantDirection(text) {
    let counted = countBy(text, char => {
        let script = characterScript(char.codePointAt(0));
        return script ? script.direction : "none";
    }).filter(({name}) => name != "none");

    if (counted.length == 0) return "ltr";

    return counted.reduce((a, b) => a.count > b.count ? a : b).name;
}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl
