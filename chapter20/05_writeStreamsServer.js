// writabel streams are a widely used concept in Node
// Those objects have a write-method
// They can be passed a string or a "Buffer"-object
// Their end() method closes the stream
// And optionally takes a value to write to the stream
// Both methods can be given a callback additionally
// which will be called when writing or closing is done

// a SERVER reads requests than writes responses
// a CLIENT writes requests than reads responses
// Reading from a stream is done with event-handles
// rather than methods

// Objects that provide events in Node have a method called "on"
// 
// "data" is fired when data comes in
// "end" is fired when stream is at its end

// a file can be read as a readable stream with "createReadStream" (from "fs")

// CREATING a SERVER that reads request bodies and streams
// them back to the client
const {createServer} = require("http");
createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    // chunk-value = binary-Buffer
    request.on("data", chunk => 
        response.write(chunk.toString().toUpperCase())); // here converted to UTF-8
    request.on("end", () => response.end());
}).listen(8000);

// it writes to process.stdout (processe's standard output,
// which is a writable stream) instead of console.log
// console.log can not be used because it writes an \n after
// each piece of text which might come in chunks