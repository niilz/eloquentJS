let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
console.log("Is Jacks's age known?", ages.has("Jack"));
console.log(ages.has("toString"));