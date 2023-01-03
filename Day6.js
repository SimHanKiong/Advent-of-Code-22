const fs = require("fs");
const input = fs.readFileSync("Day6.txt").toString().split("\n");

function equal1(a, b, c, d) {
    return a === b || a === c || a === d || b === c || b === d || c === d
}

function part1() {
    const str = input[0];
    for (let i = 0; i < str.length; i++) {
        if (!equal1(str[i], str[i + 1], str[i + 2], str[i + 3])) return i + 4;
    }
}

function equal2(arr, num) {
    let flag = false;
    for (let i = 0; i < 14; i++) {
        for (let j = i + 1; j < 14; j++) {
            flag = flag || arr[i + num] === arr[j + num];
        }
    }
    return flag;
}

function part2() {
    const str = input[0];
    for (let i = 0; i < str.length; i++) {
        if (!equal2(str, i)) return i + 14;
    }
}

console.log(part1());
console.log(part2());