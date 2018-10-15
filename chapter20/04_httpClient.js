// using the http-module as a CLIENT
const {request} = require("http");
let requestStream = request({
    // first argument = object with...
    hostname: "eloquentjavasript.net", // 1. which server to talk to
    path: "/20_node.html",             // 2. what Path to request from server
    method: "GET",                     // 3. which method to use
    headers: {Accept: "text/html"}
    // second argumen = callback-function
}, response => {
    // we could use request.write (but not with GET)
    console.log("Server responded with status code",
                response.statusCode);
});
requestStream.end();

// there are similar request-functions for the https-module

// it is more conveniant to use node-fetch instead of the raw
// node-functionality