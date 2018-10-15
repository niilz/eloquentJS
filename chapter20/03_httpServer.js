// using the http-module as a SERVER
const {createServer} = require("http");
let server = createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/html",
                             "Blubb": "Unicorn/Horse"}); // my own recognizable header ;)
                             // you can see the headers for example with
                             // a "curl -I localhost:8000 "

    // the "response.write()" method
    // can be calles multiple times
    response.write(`
        <h1>Hello!</h1>
        <p>You asked for <code>${request.url}</code></p>`);
    response.end();
});
// start server to wait for connections on port (here:) 8000
server.listen(8000);
console.log("Listening! (port 8000)");