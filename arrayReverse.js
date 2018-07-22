function reverseArray(array) {
    let reversed = [];
    for (let el of array) reversed.unshift(el);
    return reversed;
}
let abc = ["A", "B", "C"]
console.log(reverseArray(abc));

function reverseArrayInPlace(array) {
    for (let i = 0; i <= Math.floor(array.length / 2); i++) {
        let mirror = array[i];
        array[i] = array[array.length - 1 -i];
        array[array.length - 1 -i] = mirror;
    }
}

let arrayValue = [1,2,3,4,5];
console.log(arrayValue);
reverseArrayInPlace(arrayValue);
console.log(arrayValue);