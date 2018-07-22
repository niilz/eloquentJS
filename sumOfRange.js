// function range(start, end, step) {
//     let listOfRange = [];
//     if (step < 0) {
//         for (start; start >= end; start += step) {
//             listOfRange.push(start);
//         }
//     } else if (step > 0) {
//         for (start; start <= end; start += step) {
//             listOfRange.push(start);
//         }
//     } else {
//         for (start; start <= end; start++) {
//             listOfRange.push(start);
//         }
//     }
//     return listOfRange;
// }

function range(start, end, step = start < end ? 1 : -1) {
        let listOfRange = [];
        if (step > 0) {
            for (let i = start; i <= end; i += step) listOfRange.push(i);
        } else {
            for (let i = start; i >= end; i += step) listOfRange.push(i);
        }
        return listOfRange;
    }

function sum(listOfNumbers) {
    let res = 0;
    for (let num of listOfNumbers) {
        res += num;
    }
    return res;
}

//better with reduce
function sum(listOfNumbers) {
    return listOfNumbers.reduce((result, number) => result + number, 0);
}

console.log(sum(range(1, 10))); //55
console.log(sum(range(1, 10, 2))); //25