function firstElement(array) {
    if (array.length == 0) {
        throw new Error("firstElemenft called with []");
    }
    return array[0];
}

console.log(firstElement([1,2,4]))

