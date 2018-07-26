let varyingSize = {
    //size as an object.method:
    size1() { Math.floor(Math.random() * 100) },
    //size as a getter function:
    get size() {
        return Math.floor(Math.random() * 100);
    }
};
console.log(varyingSize.size1());
console.log(varyingSize.size);

class Temperature {
    constructor(degCelsius) {
        this.celsius = degCelsius;
    }
    get fahrenheit() {
        return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
        this.celsius = (value - 32) / 1.8;
    }

    static fromFahrenheit(value) {
        return new Temperature((value - 32) / 1.8);
    }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
temp.fahrenheit = 86;
console.log(temp.celsius);
console.log(temp.fahrenheit);

let temp2 = Temperature.fromFahrenheit(86); //static methods are stored on the constructor
console.log(temp2.celsius);
