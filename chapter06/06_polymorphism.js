function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.talk = function(line) {
    console.log(`when a ${this.type} rabbit talks: ${line}`);
}

let killerRabbit = new Rabbit("killer");
//killerRabbit.talk("haben die Krümel Pause");

//overriding the toString-method on the rabbit proto
Rabbit.prototype.toString = function() {
    return `a ${this.type} rabbit`;
};
console.log(String(killerRabbit));