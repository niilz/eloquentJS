function repeat(times, action) {
    for (let i = 0; i < times; i ++) {
        action(i);
    }
}
//repeat(5, console.log)

function greaterThan(num1) {
    return num2 => num2 > num1;
}
let greaterThan10 = greaterThan(10);
//console.log(greaterThan10(5));

function noisy(f) {
    return (...args) => {
        console.log("calling with", args);
        let result = f(...args);
        console.log("called with", args, ", returned", result);
    };
}
//noisy(Math.min)(1, 2, 3);

function unless(test, then) {
    if (!test) then();
}

repeat(3, n => {
    unless(n % 2 == 1, () => {
        console.log(n, "is even");
    });
});