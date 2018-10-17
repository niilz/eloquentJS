// grep like regEx-Tool
// first command-line argument = pattern
// further arguments = files to search
// Output: files which match the regEx

// extende-version: if one argument = directory
// -> search through every file in this directory

const {readFileSync} = require("fs");

let args = process.argv.slice(2);
let pattern = args[0];
let files = args.slice(1);
console.log(pattern, files);

function read(filename) {
    try {
        let current = readFileSync(filename, 'utf8');
        return current;
    } catch (err) {
        console.log("NICHT geklappt");
    }
}

function check(pattern, files) {
    pattern = new RegExp(pattern);
    let filtered = files.filter(file => {
        let current = read(file);
        return current.search(/lorem/) 
    });
    return filtered;
}

let t = check(pattern, files);
console.log(t);



// files.map(file => {
    
// })
//console.log(args);