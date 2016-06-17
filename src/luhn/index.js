'use strict';

const isNumbers = (num) => (/^\d+$/).test(num);
const arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

function luhnSum(num) {
    if (!isNumbers(num)) {return false;}
    const str = num.toString();
    let len = str.length;
    let bit = 1;
    let sum = 0;
    let val;
    while (len) {
        val = parseInt(str.charAt(--len), 10);
        val = (bit ^= 1) ? arr[val] : val;
        sum += val;
    }
    return sum;
}

function validate(num) {
    if (!isNumbers(num)) {return false;}
    const sum = luhnSum(num);
    return sum && sum % 10 === 0;
}

function checksum(num) {
    if (!isNumbers(num)) {return false;}
    const sum = luhnSum(parseInt(num, 10) * 10);
    return (sum * 9) % 10;
}

function generate(num) {
    if (!isNumbers(num)) {return false;}
    return parseInt(num.toString() + checksum(num), 10);
}

module.exports = {
    validate,
    checksum,
    generate
};
