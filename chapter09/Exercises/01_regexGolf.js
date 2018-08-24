// 1. car and cat
verify(/ca[rt]/, // correct
    ["my car", "bad cats"],
    ["camper", "high art"]);

// 2. pop and prop
verify(/pr?op/, //correct
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

// 3. ferret, ferry and ferrari
verify(/ferr[^u]/, //book wanted /ferr(et|y|ari)/, I think mine is shorter
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

// 4. ending on -ious
verify(/ious\b/, //correct
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

// 5. whitespace followed by . , : ;
verify(/\s\W/, //book wanted /\s[.,:;]/ which might a bit more logical
    ["bad punctuation ."],
    ["escape the period"]);

// 6. word longer than 6 letters
verify(/\w{7,}/, // almost; the book wanted /\w{7}/
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

// 7. word without e or E
verify(/^([^e]+ \w+|\w+ [^e]+)$/i, // book wanted /\b[^\We]+\b/i
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]);


// the test-function:
function verify(regexp, yes, no) {
    //ingore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes) if (!regexp.test(str)) {
        console.log(`Failure to match '${str}'`);
    }
    for (let str of no) if (regexp.test(str)) {
        console.log(`Unexpected match for '${str}'`);
    }
}