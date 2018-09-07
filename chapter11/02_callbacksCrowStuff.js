// all the code of Chapter 11 in one file

let {bigOak} = require("./crow-tech");
let {defineRequestType} = require("./crow-tech");

bigOak.readStorage("food caches", caches => {
    let firstCache = caches[0];
    bigOak.readStorage(firstCache, info => {
        console.log(info);
    });
});

bigOak.send("Cow Pasture", "note", "Let's caw louldly at 7PM",
            () => console.log("Note delivered"));

// Type handling thingy to receive requests
defineRequestType("note", (nest, content, source, done) => {
    consoel.log(`${nest.name} received note: ${content}`);
    done();
});

// constructor expects a function, which gets called immediately
function storage(nest, name) {
    return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
    });
}

storage(bigOak, "enemies")
    .then(value => console.log("Got", value));


class Timeout extends Error {}

function request(nest, target, type, content) {
    return new Promise((resolve, reject) => {
        let done = false;
        function attempt(n) {
            nest.send(target, type, content, (failed, value) => {
                done = true;
                if (failed) reject(failed);
                else resolve(value);
            });
            setTimeout(() => {
                if (done) return;
                else if (n < 3) attempt(n + 1);
                else reject(new Timeout("Timed out"));
            }, 250);
        }
        attempt(1)
    });
}

// wrapper for "defineRequestType"
function requestType(name, handler) {
    defineRequestType(name, (nest, content, source,
                            callback) => {
        try {
            Promise.resolve(handler(nest, content, source))
            .then(response => callback(null, response),
                failure => callback(failure));
        } catch (exeption) {
            callback(exeption);
        }
    });
}

requestType("ping", () => "pong");

function availableNeighbors(nest) {
    let requests = nest.neighbors.map(neighbor => {
    return request(nest, neighbor, "ping")
        .then(() => true, () => false);
    });
    return Promise.all(requests).then(result => {
    return nest.neighbors.filter((_, i) => result[i]);
    });
}
       
    
let {everywhere} = require("./crow-tech");

everywhere(nest => {
    nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
    nest.state.gossip.push(message);
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue;
        request(nest, neighbor, "gossip", message);
    }
}

requestType("gossip", (nest, message, source) => {
    if (nest.state.gossip.includes(message)) return;
    console.log(`${nest.name} received gossip '${message}' from ${source}`);
    sendGossip(nest, message, source);
});

//commented out cause it spits out the text for every single nest
//sendGossip(bigOak, "Kids with airgun in the park");


// Message Routing for connections, more effective than flooding

requestType("connections", (nest, {name, neighbors}, source) => {
    let connections = nest.state.connections;
    if (JSON.stringify(connections.get(name)) ==
        JSON.stringify(neighbors)) return;
    connections.set(name, neighbors);
    broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
    for (let neighbor of nest.neighbors) {
        if (neighbor == exceptFor) continue;
        request(nest, neighbor, "connection", {
            name,
            neighbors: nest.state.connections.get(name)
        });
    }
}

everywhere(nest => {
    nest.state.connections = new Map;
    nest.state.connections.set(nest.name, nest.neighbors);
    broadcastConnections(nest, nest.name);
});

function findRoute(from, to, connections) {
    let work = [{at: from, via: null}];
    for (let i = 0; i < work.length; i++) {
        let {at, via} = work[i];
        for (let next of connections.get(at) || []) {
            if (next == to) return via;
            if (!work.some(w => w.at == next)) {
                work.push({at: next, via: via || next});
            }
        }
    }
    return null;
}

function routeRequest(nest, target, type, content) {
    if (nest.neighbors.includes(target)) {
        return request(nest, target, type, content);
    } else {
        let via = findRoute(nest.name, target, nest.state.connections);
        if (!via) throw new Error(`No route to '${target}'`);
        return request(nest, via, "route", {target, type, content});
    }
}

requestType("route", (nest, {target, type, content}) => {
    return routeRequest(nest, target, type, content);
});

//won't return a route, must be a bug somewhere
//routeRequest(bigOak, "Church Tower", "note", "Incoming jackdaws!");

//ASYNC FUNCTIONS

requestType("storage", (nest, name) => storage(nest, name));


// "findInStorage" with Promises
function findInStorage(nest, name) {
    return storage(nest, name).then(found => {
        if (found != null) return found;
        else return findInRemoteStorage(nest, name);
    });
}

function network(nest) {
    return Array.from(nest.state.connections.keys());
}

function findInRemoteStorage(nest, name) {
    let sources = network(nest).filter(n => n != nest.name);
    function next() {
        if (source.length == 0) {
            return Promise.reject(new Error("Not found"));
        } else {
            let source = sources[Math.floor(Math.random() * sources.length)];
            sources = sources.filter(n => n != source);
            return routeRequest(nest, source, "storage", name)
                .then(value => value != null ? value : next(), next());
        }
    }
    return next();
}

//"findInStorage" with async and await
async function findInStorage(nest, name) {
    let local = await storage(nest, name);
    if (local != null) return local;

    let sources = network(nest).filter(n => n != nest.name);
    while (sources.length > 0) {
        let source = sources[Math.floor(Math.random() * sources.length)];
        sources = sources.filter(n => n != source);
        try {
            let found = await routeRequest(nest, source, "storage", name);
            if (found != null) return found;
        } catch (_) {}
    }
    throw new Error("Not found");
}

findInStorage(bigOak, "events on 2017-12-21")
    .then(console.log);