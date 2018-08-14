class PGroup {
    constructor(values) {
        this.values = Array.from(values);
    }
    add(item) {
        let extended = this.values;
        extended.push(item);
        return new PGroup(extended);
    }

    delete(item) {
        let front = this.values.slice(0, this.values.indexOf(item));
        let back = this.values.slice(this.values.indexOf(item) + 1);
        return new PGroup(front.concat(back));
    }

    has(item) {
        return this.values.includes(item);
    }
}

let group = new PGroup('abc').add('d');
let group2 = group.delete("b");
console.log(group);
console.log(group2)
console.log(group2.has("d"))