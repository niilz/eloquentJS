// getting access to match-object in loop body
// by using lastIndex and exec
let input = "A string with 3 numbers in it... 42 and 88.";
let number = /\b\d+\b/g;
let match;
while (match = number.exec(input)) {
    console.log("Found", match[0], "at", match.index);
}
// Found 3 at 14
// Found 42 at 33
// Found 88 at 40