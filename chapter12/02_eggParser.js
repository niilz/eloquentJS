// first part of the parser

// indirect recursion by parseExpression and parseApply calling each other

function parseExpression(program) {
    // gets rid of leading whiteSpace (defined below)
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) { // matches strings
        expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) { // matches values that are numbers
        expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) { // matches words without special characters
        expr = {type: "word", name: match[0]};
    } else new SyntaxError("Unexpected snytax: " + program); // if none of those types, throw SyntaxError
    
    // passes what is found to parseApply with object for the expression (defined below)
    return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
    let stuffToSkip = string.match(/^(\s|#.*)*/);
    return string.slice(stuffToSkip[0].length);
}


// checks whether expression is an application. if it is -> parse into a list of arguments
function parseApply(expr, program) {
    program = skipSpace(program);
    // returns expression unless ther is open paranthesis
    if (program[0] != "(") {
        return {expr: expr, rest: program};
    }

    // if there is open parans -> build syntax tree of application...
    program = skipSpace(program.slice(1));
    // expression object with three keys
    expr = {type: "apply", operator: expr, args: []};
    while (program[0] != ")") { // ...until parans close (end of application)
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);
        if (program[0] == ",") {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ")") {
            throw new SyntaxError("Expected ',' or ')'");
        }
    }
    // must call iteself in case an expression was itself applied (e.g. mulitplier(2)(1))
    return parseApply(expr, program.slice(1));
}

// wrapper function
function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
        throw new SyntaxError("Unexpected text after program");
    }
    return expr;
}

// exports the parse-function
module.exports = {
    parse: parse,
};


// console.log(parse("+(a, 10)"));
// //   {type: "apply",
// //    operator: {type: "word", name: "+"},
// //    args: [{type: "word", name: "a"},
// //           {type: "value", value: 10}]}