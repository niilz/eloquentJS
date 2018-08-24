// strange behaviour because regex actually look at code units
console.log(/🍅{3}/.test("🍅🍅🍅")); //{3} only applies to the 2nd code unit
// false
console.log(/<.>/.test("<🌹>"));// dot only applies to one code unit
// false
console.log(/<.>/u.test("<🌹>")); // u stand for unicode and than treats input as proper chars
// true

// recently added to spec is \p (u must be enabled) which matches chars, the unicode standard is assigned to
// does not yet work here in VS Code
console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
console.log(/\p{Alphabetic}/u.test("α"));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false