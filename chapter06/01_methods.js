let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The rabbit says '${line}'`);
};
rabbit.name = "coolio";
//rabbit.speak("I'm alive.");
//console.log(rabbit)

function speak(line) {
    console.log(`The ${this.type} rabbit says ${line}`);
}

let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak('Oh my ears blabla');
hungryRabbit.speak("happa happa");

speak.call({type: "fresh", speak}, "I am so shiny"); //first parameter {...} belongs to "this"

function normalize() {
    console.log(this.choords.map(n => {
        return n/this.length;
    }))
    console.log(this.name);
}

normalize.call({choords: [1,2,3,4], length: 5, name: "haribob"});