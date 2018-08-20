function numberToString(n, base = 10) {
    let result = "", sign = "";
    if (n < 0) {
        sign = "-";
        n = -n;
    }
    do {
        result = String(n % base) + result;
        console.log("res", result);
        n = Math.floor(n/base);
        console.log("n", n);
    } while (n > 0);
    return sign + result;
}

console.log(numberToString(13, 6));

// 13 % 6 = res 1
// 13 / 6 = n 2.xxx
// 2 % 6 = res 2
// 2 / 6 = n 0.xxx 
//res + res = 21 