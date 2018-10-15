const {readFile} = require("fs");
readFile("file.txt", (error, buffer) => {
    if (error) throw error;
    console.log("The file contained", buffer.length, "bytes.",
                "The first byte is:", buffer[0]);
})

const {writeFile} = require("fs");
writeFile("graffiti.txt", "Node was here", err => {
    if (err) console.log(`Failed to write file: ${err}`);
    else console.log("File written.");
});

// fs also has othe functions
// examples (all mostly take a Callback as the last parameter
// with "err" as first and "result" as second argument):
//
// readdir -> file-directory as an array of strings
// stat    -> retrieves info about a file
// unlin   -> rename a file
// unlink  -> remove a file
// (see the docs under http://nodejs.org)

// ther is promise-implementation of fs which can look like:
// const {readFile} = require("fs").promises;
// readFile("file.txt", "utf8")
//     .then(text => console.log("The file contains:", text));

// if async is not necessary one can use readFileSync
const {readFileSync} = require("fs");
console.log("The file contains:",
            readFileSync("file.txt", "utf8"));