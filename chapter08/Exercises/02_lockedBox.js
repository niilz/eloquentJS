const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked!");
        return this._content;
    }
};

function withBoxUnlocked(body) {
    if (box.locked == true) box.unlock();
    try {
        body();
    } finally {
        box.lock();
    }
}

//the book wants that I return body(). But actually without it it works just fine in this case. Proof me wrong ;)

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error ("Pirates on the horizon! Abort");
    });
} catch (e) {
    console.log("Error YOO raised:", e);
}
console.log(box.locked);
//true