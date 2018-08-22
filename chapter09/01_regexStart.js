//creating regex with constructor:
let re1 = new RegExp("abc");
//creating regex literal
let re2 = /abc/;

let eighteenPlus = /eighteen\+/;

//simplest method on regexes is test():
console.log(re2.test("abcde"));
//true
console.log(re2.test("abxde"));
//false