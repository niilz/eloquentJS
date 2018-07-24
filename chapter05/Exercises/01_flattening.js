let arrays = [[1, 2, 3], [4, 5], [6]];

let flattened = arrays.reduce((newArray, array) => newArray.concat(array), []);
console.log(flattened);