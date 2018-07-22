let list = [1, 2, 3, 4]
list.push(5); //adds "5" to list
console.log(list);
list.concat(6); //does not change list
console.log(list);
let copyOfList = list.concat(6); //creates the binding "copyOfList" and adds "6" to it
console.log(copyOfList);

list.push(5,6); //can also push two items
console.log(list);
let secondCopy = list.concat(7,8); //adds "7 and 8" to the new copy of list
console.log(secondCopy);