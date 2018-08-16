class PGroup {
    constructor(values) {
        this.values = values;
    }

    add(item) {
        if (this.has(item)) return this;
        return new PGroup(this.values.concat([item]));
    }

    delete(item) {
        if (!this.has(item)) return this;
        return new PGroup(this.values.filter(v => v !== item));
    }

    has(item) {
        return this.values.includes(item);
    }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false