class PGroup {
    constructor(values) {
        this.values = values;
    }

    add(item) {
        let added = this.values;
        added.push(item);
        return new PGroup(added);
    }

    delete(item) {
        // let front = this.values.slice(0, this.values.indexOf(item));
        // let back = this.values.slice(this.values.indexOf(item) + 1);
        //return new PGroup(front.concat(back));
        let deleted = this.values.filter(v => v != item);
        return new PGroup(deleted);
    }
    
    has(item) {
        return this.values.includes(item);
    }
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(a);
console.log(b);
console.log(b.has("b"));
// → true
console.log(a);
console.log(a.has("b"));
// → false
console.log(b);
console.log(b.has("a"));
// → false