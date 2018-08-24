//remove all comments
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
//1 + 3
console.log(stripComments("x = 10;// ten!"));
// x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
//1 1

//now non greedy with ? behind the star after [^]
function stripNonGreedy(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
//this replaces all comment instances
console.log(stripNonGreedy("1 /* a */+/* b*/ 1"));
//1 + 1