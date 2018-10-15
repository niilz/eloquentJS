// this CLIENT will send code to the writeStreamsServer
// and than write the revieving response

const {request} =require("http");
request({
    hostname: "localhost",
    port: 8000,
    method: "POST"
},  response => {
    response.on("data", chunk => 
        process.stdout.write(chunk.toString()));
}).end("Hello server");
// HELLO SERVER