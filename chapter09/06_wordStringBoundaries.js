// ^ mathes start of a string $ mathes the end to enforce that the whole string gets matched against

//matches a string, entirely of digits
let stringOfDigits = /^\d+$/;

//matches a string that starts with a !
let startWithBang = /^!/;

//matches nothing. There connot be anything before a start
let nothingBeforeStart = /x^/;

// \b is start or end of a word (made of \w characters)
console.log("no boundary", /cat/.test("concatenate"));
//true
console.log("with boundary", /\bcat\b/.test("concatenate"));
//false