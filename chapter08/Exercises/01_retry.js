class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
    if (Math.random() < 0.2) {
        return a * b;
    } else {
        throw new MultiplicatorUnitFailure("Klunk");
    }
}

function reliableMultiply(a, b) {
    let result;
    while (typeof result != "number") {
        try {
            result = primitiveMultiply(a, b);
        }
        catch(error) {
            if (error instanceof MultiplicatorUnitFailure) {
                console.log(error); 
            }
        }
    }
    return result;
}

console.log(reliableMultiply(8, 8));
// → 64 (it actually gets the 64 but it also almost always logs an error before...)

// so the book suggests this:

function evenMoreReliableMulitply(a, b) {
    for (;;) {
        try {
            return primitiveMultiply(a, b);
        } catch (e) {
            if (!(e instanceof MultiplicatorUnitFailure)) throw e;
        }
    }
}

console.log(evenMoreReliableMulitply(8, 8));

//conclusion: if I had written the same if block in my function it would have worked just the same