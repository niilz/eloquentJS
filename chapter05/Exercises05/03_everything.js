//this I got on my own right away
function every1(array, test) {
    for (let el of array) {
        if (!test(el)) return false;
    }
    return true;
}
console.log(every1([1, 3, 5], n => n < 10));
// → true
console.log(every1([2, 4, 16], n => n < 10));
// → false
console.log(every1([], n => n < 10));
// → true

//but this...?!
function every2(array, test) {
    return !array.some(el => !test(el)); //apparently it derives from "De Morgan's Law" where a && b is the same as !(!a || !b). who wouldn't have guessed it
}
console.log(every2([1, 3, 5], n => n < 10));
// → true
console.log(every2([2, 4, 16], n => n < 10));
// → false
console.log(every2([], n => n < 10));
// → true
