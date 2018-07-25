function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.talk = function(line) {
    console.log(`The ${this.type} rabbit says "${line}"`);
}
let killerRabbit = new Rabbit("killer");

let sym = Symbol("name");
Rabbit.prototype[sym] = 55;
//console.log(killerRabbit[sym]);

const toStringSymbol = Symbol("toString");
Array.prototype[toStringSymbol] = function() {
    return `${this.length} cm of blue yarn`;
}
console.log([1,2].toString());
console.log([1,2][toStringSymbol]());

let stringObject = {
    [toStringSymbol]() { return "a jute rope"; }
};
console.log(stringObject[toStringSymbol]());