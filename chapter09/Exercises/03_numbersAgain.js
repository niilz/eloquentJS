//number Parser into JS numbers
let number = /^[-|+]?\d+?(\.\d+)?(e[+-]?\d+)?$|^\.\d+$|^\d+\.$/i // soooo this works for the test but oh my that is verbose
let noBook = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/; // not much shorter though, is it

// Test
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
    if (!number.test(str)) {
        console.log(`Failed to match '${str}'`);
    }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
    if (number.test(str)) {
        console.log(`Incorrectly accepted '${str}'`);
    }
}

// Test
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
    if (!noBook.test(str)) {
        console.log(`Failed to match '${str}'`);
    }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
    if (noBook.test(str)) {
        console.log(`Incorrectly accepted '${str}'`);
    }
}