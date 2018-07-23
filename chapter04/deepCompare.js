//a bit nested but it works
// function deepEqual(val1, val2) {
//     if (val1 === val2) return true;
//     else if (typeof(val1) === "object" 
//             && typeof(val2) === "object"
//             && val1 != null
//             && val2 != null) {
//         for (let key1 of Object.keys(val1)) {
//             for (let key2 of Object.keys(val2)) {
//                 return deepEqual(val1[key1], val2[key2]);
//             }
//         }
//     }
//     return false
// }

//also quite verbose (I think) but not as nested; the book solution:
function deepEqual(val1, val2) {
    if (val1 === val2) return true; //nothing new yet

    if (val1 == null || typeof val1 != "object" ||
        val2 == null || typeof val2 != "object") return false; //so all false cases fon non-objects are now defined (smart, i guess)
    
    let keys1 = Object.keys(val1), keys2 = Object.keys(val2);

    if (keys1.length != keys2.length) return false //if objects are of different sizes ther not equal so FALSE

    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(val1[key], val2[key])) return false; //are all keys the same in both objects? and the values aswell? if not: FALSE
    }    
    return true; //by now all false-cases should have returned, so we can return true. I like this idea.
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));