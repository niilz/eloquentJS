let run = require("./03_eggEvaluator.js").run;

run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
        do(define(total, +(total, count)),
           define(count, +(count, 1)))),
   print(total))
`);

// 55

run(`
do(define(plusOne, fun(a, +(a, 1))),
    print(plusOne(10)))
`);

// 11

run(`
do(define(pow, fun(base, exp,
        if(==(exp, 0),
        1,
         *(base, pow(base, -(exp, 1)))))),
    print(pow(2, 10)))
`);
// 1024