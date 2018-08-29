// it won't work because there is just no crow-tech module

import {bigOak} from "./crowTech";
import {defineRequestType} from "./crowTech";

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

