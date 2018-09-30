
let squareWorker = new Worker("./squareworker.js");
squareWorker.addEventListener("message", event => {
    console.log("The worker responded:", event.data);
})
squareWorker.postMessage(10);
squareWorker.postMessage(24);
