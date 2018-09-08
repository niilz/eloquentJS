// doesn't work (other modules would be needed) it's just a code-along

function anyStorage(nest, source, name) {
    if (source == nest.name) return storage(nest, name);
    else return routeRequest(nest, source, "storage", name);
}

async function chicks(nest, year) {
    let list = "";
    await Promise.all(network(nest).map(async name => {
        list += `${name}: ${
            await anyStorage(nest, name, `chicks is ${year}`)
        }\n`;
    }));
    return list;
}
// this would only print one line, because the map statement always works from an empty list. Due to waiting for the promise
chicks(bigOak, 2017).then(console.log);

// this can be solved by .join on the promise
async function chicks(nest, year) {
    let lines = network(nest).map(async name => {
        return name + ": " +
            await anyStorage(nest, name, `chicks in ${year}`);
    });
    return (await Promise.all(lines)).join("\n");
}