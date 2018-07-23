//goes in the wrong direction:
// function arrayToList(array) {
//     let list = {};
//     for (el in array) {
//         list.value = array.pop(el);
//         list.rest = arrayToList(array);
//     }
//     return list;
// }

//after reading the hints now it gives the right answer
// function arrayToList(array) {
//     let list = {};
//     for (let i of array) {
//         list.value = array.shift();
//         if (array.length != 0) list.rest = arrayToList(array);
//         else list.rest = null;
//     }
//     return list;
// }

//in how arrayToList was supposed to be:
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = {value: array[i], rest: list};
    }
    return list;
}
console.log(arrayToList([10, 20, 30]));

function listToArray(list) {
    let array = [];
    for (let node = list; node; node = node.rest) array.push(node.value);
    return array;
}
console.log(listToArray(arrayToList([10, 20, 30])));

// function prepend(el, list) {
//     let array = listToArray(list);
//     array.unshift(el);
//     return arrayToList(array);
// }

//in how prepend was supposed to be solved:
function prepend(el, list) {
    return {value: el, rest: list};
}
console.log(prepend(10, prepend(20, null)));

// function nth(list, num) {
//     let array = listToArray(list);
//     return array[num];
// }

//I liked my version but here is the recursive version:
function nth(list, num) {
    if (!list) return undefined;
    else if (num == 0) return list.value;
    else return nth(list, num - 1);
}
console.log(nth(arrayToList([10, 20, 30]), 1));
