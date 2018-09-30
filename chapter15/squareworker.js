addEventListener("message", evetn => {
    postMessage(event.data * event.data);
})