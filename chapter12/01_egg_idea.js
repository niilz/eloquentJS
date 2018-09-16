// Applications are written with parans after the expression

// do(define(x, 10)),
//     if(>(x, 5),
//         print("large"),
//         print("small")))

// // would be written like:
// {
//     type: "apply",
//     operator: {type: "word", nam: ">"},
//     args: [
//         {type: "word", name: "x"},
//         {type: "value", value: 5}
//     ]
// }

