// number + pig or cow or chicken
let digitAnimal = /\b\d+ (cow|pig|chicken)s?\b/;
console.log("digitAnimal", digitAnimal.test("3 pigs"));
//true
console.log("noAnimalMatch", digitAnimal.test("15 pigchickens"));
//false