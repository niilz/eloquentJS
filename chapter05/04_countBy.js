// var SCRIPTS:
require('./02_scriptsdata.js')

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
console.log(countBy(testArray, n => n > 2)); //this function, passed into countBy will be called on every item as groupName and checks if it is bigger than 2
//so in the end we have 2 items [1,2] that return false as a name since they are not bigger than 2
//and three items [3,4,5] that are greater than 2