//My attemp
// function loop(val, testFunc, update, body) {
//     while (val) {
//         if (!testFunc(val)) return;
//         else body(val);
//         val = update(val);
//     }
// }

//what the book had in mind
function loop(start, testFunc, update, body) {
    for (let value = start; testFunc(value); value = update(value)) {
        body(value);
    }
}

loop(3, n => n > 0, n => n - 1, console.log);
