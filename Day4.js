const fs = require("fs");
const input = fs.readFileSync("Day4.txt").toString().split("\n");

function compare1(arr) {
    const numArr = arr.map(x => parseInt(x, 10));
    if ((numArr[0] >= numArr[2] && numArr[1] <= numArr[3]) || (numArr[0] <= numArr[2] && numArr[1] >= numArr[3])) return 1;
    else return 0;
}

function part1() {
    return input
        .map(pair => pair.split(/,|-/))
        .map(arr => compare1(arr))
        .reduce((sum, num) => sum + num);
}

function compare2(arr) {
    const numArr = arr.map(x => parseInt(x, 10));
    if (numArr[1] >= numArr[2] && numArr[0] <= numArr[3]) return 1;
    else return 0;
}

function part2() {
    return input
        .map(pair => pair.split(/,|-/))
        .map(arr => compare2(arr))
        .reduce((sum, num) => sum + num);
}

console.log(part1());
console.log(part2());

