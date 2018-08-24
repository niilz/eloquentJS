// number + pig or cow or chicken
let digitAnimal = /\b\d+ (cow|pig|chicken)s?\b/;
console.log("digitAnimal", digitAnimal.test("3 pigs"));
//true
console.log("noAnimalMatch", digitAnimal.test("15 pigchickens"));
//false

//unnacessary outer loop:
let crazyRegex = /([01]+)+b/;
//so don't call that it'll loop veeeeeery long
//console.log(crazyRegex.test("0100010101010101010101010010110110101010101010"));
let okRegex = /([01]+)b/;
//but this works just fine
console.log(okRegex.test("0100010101010101010101010010110110101010101010"));
