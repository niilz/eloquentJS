//find any number in a string
console.log("123...:", /[0123456789]/.test("in 1992"));
//true

//shortened syntax
console.log("[0-9]:", /[0-9]/.test("in 1992"));
//true

/* other syntax
  \d    any digit
  \w    any word-character
  \s    any whitespace character
  \D    any NOT digit
  \W    any NOT word-character
  \S    any NOT whitespace characte
  ...
*/

let date = /\d\d\-\d\d\-\d\d\d\d\ \d\d\:\d\d/ //you can escape the dashes and the colon...
let date2 = /\d\d-\d\d-\d\d\d\d\ \d\d:\d\d/ //...but you don't have to
console.log("date:", date.test("01-30-2003 15:20"));
//true
console.log("date2:", date2.test("01-30-2003 15:20"));
//true
console.log("date:", date.test("01-jan-2003 15:20"));
//false

let notBinary = /[^01]/;
console.log("notBin 1:", notBinary.test("1100100010100110"));
//false
console.log("notBin 2:", notBinary.test("1100102010100110"));
//true

console.log("more digits:", /\d+/.test("'123'"));
//true
console.log("more digits:", /\d+/.test("''"));
//false
console.log("zero or more digits:", /\d*/.test("'124'"));
//true
console.log("zero or more digits:", /\d*/.test("''"));
//true

// ? marks optional patterns (0 or 1 time)
let neighbor = /neighbou?r/;
console.log("neighbour:", neighbor.test("neighbour"));
//true
console.log("neighbor:", neighbor.test("neighbor"));
//true

//exact number of time with {}
let betterDate = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/
console.log("betterDate:", betterDate.test("1-30-2018 8:45"));
//true
//ranges are done by {1,5} or open end {3,}

let cartoonCrying = /boo+(hoo+)+/i; //i means case-insensitive
console.log("cartoonCry:", cartoonCrying.test("BoooOohooHOoohoo"));
//true