// methods stores the HTTP-methods
// method-handlers are async

const {createServer} = require("http");

const methods = Object.create(null);

createServer((request, response) => {
    let handler = methods[request.method] || notAllowed;
    handler(request)
        .catch(error => {
            if (error.status != null) return error;
            // 500 = failed to handle the request
            return {body: String(error), status: 500};
        })
        .then(({body, status = 200, type = "text/plain"}) => {
            response.writeHead(status, {"Content-Type": type});
            if (body && body.pipe) body.pipe(response);
            else response.end(body);
        });
}).listen(8000);

async function notAllowed(request) {
    return {
        // 405 = server refuses this method
        status: 405,
        body: `Method ${request.method} not allowed.`
    };
}

// parse for url-directory
const {parse} = require("url");
// sep = system-path-seperator (\ on windows; / on others systems)
const {resolve, sep} = require("path");

// get current working directory
const baseDirectory = process.cwd();

function urlPath(url) {
    let {pathname} = parse(url);
    // resolves relative paths
    let path = resolve(decodeURIComponent(pathname).slice(1));
    // check if path is below working directory
    if (path != baseDirectory &&
        !path.startsWith(baseDirectory + sep)) {
            // 403 = file does not start with base directory
            throw {status: 403, body: "Forbidden"};
    }
    return path;
}

// to find correct Content-Type, according to
// file-extension, npm-mime-package is used
// (npm install mime@2.2.0)


// #### GET ####
const {createReadStream} = require("fs");
const {stat, readdir} = require("fs").promises;
const mime = require("mime");

methods.GET = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") throw error;
        // 404 = requested file does not exist
        else return {status: 404, body: "File not found"};
    }
    if (stats.isDirectory()) {
        // if it is a directory -> return array of file-names
        return {body: (await readdir(path)).join("\n")};
    } else {
        // for files return a readable stream
        return {body: createReadStream(path),
                type: mime.getType(path)};
    }
};

// #### DELETE ####
const {rmdir, unlink} = require("fs").promises;

methods.DELETE = async function(request) {
    let path = urlPath(request.url);
    let stats;
    try {
        stats = await stat(path);
    } catch (error) {
        if (error.code != "ENOENT") throw error;
        // 204 = no such content
        else return {status: 204}
    }
    if (stats.isDirectory()) await rmdir(path);
    else await unlink(path);
    return {status: 204};
};

// #### PUT ####
const {createWriteStream} = require("fs");

// pipe moves data from "readable-" to "writable" stream
// but it is not a Promise, so "pipe" gets a wrapper around it's outcome
function pipeStream(from, to) {
    return new Promise((resolve, reject) => {
        // checks for "error- and finish-events" and calls
        // resolve/reject respectively
        from.on("error", reject);
        to.on("error", reject);
        to.on("finish", resolve);
        from.pipe(to);
    });
}

methods.PUT = async function(request) {
    let path = urlPath(request.url);
    await pipeStream(request, createWriteStream(path));
    return {status: 204};
};

// CURL - TEST - CALLS
// (-X option = is used to set method)
// (-d opton = includes a body)

// $ curl http://localhost:8000/file.txt
// File not found
// $ curl -X PUT -d hello http://localhost:8000/file.txt
// $ curl http://localhost:8000/file.txt
// hello
// $ curl -X DELETE http://localhost:8000/file.txt
// $ curl http://localhost:8000/file.txt
// File not found