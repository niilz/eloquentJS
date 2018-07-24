// var SCRIPTS:
require('./02_scriptsdata.js')

function characterScript(code) {
    for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code <= to
            })) {
            return script; //this return belongs to the if-statement. All the stuff from the if-keyword up to this return is just a statement (with an entire function in it)
        }
    }
    return null;
}

console.log(characterScript(121).name);

let horseShoe = "🐴👟";
console.log(horseShoe.length); //gives 4 which is not what we want, since there are only two signs
console.log(horseShoe.charCodeAt(0)) //gives the number of half the horse
console.log(horseShoe.codePointAt(0)) //gives the actual horse-emoji code

let roseDragon = "🌹🐉";
for (let char = 0; char <= roseDragon.length; char++) {
    console.log(char);
}//this logs 1234, because the two signs take up two 16-bit units each

for (let char of roseDragon) {
    console.log(char);
}//shows the actual emojis because the for-of-loop apparently knows about the UTF16 issue

