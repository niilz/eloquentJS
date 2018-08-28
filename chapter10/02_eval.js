// code eval with unfortunate behaviour
const x = 1;
function evalAndReturn(code) {
    eval(code);
    return x;
}

console.log(evalAndReturn("var x = 2"));
// 2
console.log(x);
// 1

// better with Function-constructor
let plusOne = Function("n", "return n + 1");
console.log(plusOne(2));
// 3