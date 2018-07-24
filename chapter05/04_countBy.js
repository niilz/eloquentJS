// var SCRIPTS:
require('./02_scriptsdata.js')

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

let testArray = [1,2,3,4,5];
//console.log(countBy(testArray, n => n > 2)); //this function, passed into countBy will be called on every item as groupName and checks if it is bigger than 2
//so in the end we have 2 items [1,2] that return false as a name since they are not bigger than 2
//and three items [3,4,5] that are greater than 2

function textScripts(text) {
    //takes a string as an argument
    let scripts = countBy(text, char => {
        //takes this text and uses a function...
        let script = characterScript(char.codePointAt(0));
        //...to go over every char, using the function "characterScript" to find out to which script the char belongs
        return script ? script.name : "none";
        //if it found a fitting script, it's name is returned. Otherwise: none
    }).filter(({name}) => name != "none");
    //only puts the found ones into the script binding

    let total = scripts.reduce((sum, {count}) => sum + count, 0);
    //sums up all counts of all scripts in the scripts binding
    if (total == 0) return "No scripts found";

    return scripts.map(({name, count}) => {
        return `${Math.round(count * 100 / total)}% ${name}`;
        //makes a new array; calculates the percentage of script-use within the text; for every found script individually
    }).join(", "); //formats it as one string, comma-seperated
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));