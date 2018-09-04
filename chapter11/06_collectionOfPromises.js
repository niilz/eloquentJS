// Promise.all is usefull for collections of promises
// it returns a promise that waits for all promises to resolve

requestType("ping", () => "pong");

function availableNeighbors(nest) {
    let requests = nest.neighbors.map(neighbor => {
        return request(nest, neighbor, "ping")
        .then(() => true, () => false);
    });
    return Promise.all(requests).then(result => {
        return nest.neigbors.filter((_, i) => result[i]);
    });
}