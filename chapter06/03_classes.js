//Class-Notation
class RabbitClass {
    constructor(type, name) {
        //needs to be called constructor
        this.type = type;
        this.name = name;
    }
    babbel(line) {
        console.log(`The ${this.type} rabbit called '${this.name}' says '${line}'`);
    }
}

let killerRabbit = new RabbitClass("killer", "Simon Pheonix");
let sweetRabbit = new RabbitClass("sweet", "Lollipop");

killerRabbit.babbel("Oh shit, they let anybody into this century");

RabbitClass.extraMethod = () => console.log("Simon says jump"); //this won't work, Classes can not get extra Methods
RabbitClass.prototype.extraMethod = () => console.log("Simon says jump"); //but this works, when Method is defined on prototype
killerRabbit.extraMethod();

console.log(RabbitClass.prototype);