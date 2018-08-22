//exec (execute) return null if no match was found
let match = /\d+/.exec("one two 100");
console.log("match:", match);
//[100...]
console.log("match.index", match.index);
//8

//there is a match method (similar to exec):
console.log("match matched", "one two 100".match(/\d+/));
//[100...]

//quotes group the regex:
let quotedText = /'([^']*)'/;
console.log("quotedText:", quotedText.exec("she said 'hello'"));
//"'hello'", "hello"

console.log("bad(ly)?:", /bad(ly)?/.exec("bad"));
//bad, undefined
console.log("several hits but only last in array:", /(\d)+/.exec("123"));
//123, 3