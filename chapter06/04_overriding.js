//Class-Notation
class Rabbit {
    constructor(type, name) {
        //needs to be called constructor
        this.type = type;
        this.name = name;
    }
    babbel(line) {
        console.log(`The ${this.type} rabbit called '${this.name}' says '${line}'`);
    }
}

let killerRabbit = new Rabbit("killer", "Simon Pheonix");
let sweetRabbit = new Rabbit("sweet", "Lollipop");

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);

killerRabbit.teeth = "long, sharp and bloody";
console.log(killerRabbit.teeth);
console.log(sweetRabbit.teeth);
console.log(Rabbit.prototype.teeth);

