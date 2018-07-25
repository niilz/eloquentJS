let empty = {};
console.log(empty.toString);
console.log(empty.toString());

let protoRabbit = {
    runningSound(sound) {
        console.log(`The ${this.type} rabbit makes "${sound}" while he is running`);
    }
};

let zoomRabbit = Object.create(protoRabbit);
zoomRabbit.type = "highSpeedRabbit";
zoomRabbit.runningSound("zooooom");

//class like prototypes
function rabbitConstructor(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
}

let whopRabbit = rabbitConstructor("superSlowRabbit");
whopRabbit.runningSound("whopwhopwhop");

// here as Constructor to use it with "new"
function Rabbit(type) {
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}`);
}
Rabbit.prototype.kind = "animal";

let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("huzifutzidutzi");
console.log(weirdRabbit.kind);
console.log(Object.getPrototypeOf(Rabbit));
console.log(Rabbit.prototype);
console.log(Object.getPrototypeOf(weirdRabbit));









