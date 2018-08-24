let name = "Harry";
let text = "Harry is a suspicious character";
//because new RegExp needs a string \b gets another escaping \
let regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));
// _Harry_ is a...

let loard = "dea+hl[]rd";
let line = "This dea+thl[]rd guy is super geeky";
let escaped = loard.replace(/[\\[.+*?(){|^$]/g, "\\$&");
console.log(escaped);
//dea\+hl\[]rd
let lordRegex = new RegExp("\\b" + escaped + "\\b", "gi");
console.log(line.replace(lordRegex, "_$&_"));
// This _dea+thl[]rd_ is...