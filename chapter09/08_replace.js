
//Replace-method
console.log("papa".replace("p", "m"));
//mapa

//first argument can be regex
console.log("papa".replace(/p/, "m"));
//mapa

//g-flag makes regex global
let boro = "Borobudur";
console.log(boro.replace(/[ou]/, "a"));
//Barobodur
console.log(boro.replace(/[ou]/g, "a"));
//Barabadar

//group and replace with variables (up to 9 $)
console.log(
    "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1")
);
//Barbara Liskow John McCarthy Philip Wadler

//use a function within the replace-method:
let s = "the cia and fbi";
console.log(s.replace(/cia|fbi/g, str => str.toUpperCase()));
//the CIA and FBI (the book actually wanted /\b(fbi|cia)\b/g)

let stock = "1 icecream, 2 winegums, 101 shirmps";
function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) { //only one left, so no 's'
        unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
        amount = "no";
    }
    return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// no icecream, 1 winegum, 100 shrimps
