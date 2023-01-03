const fs = require("fs");
const input = fs.readFileSync("Day2.txt").toString().split("\n");

function round1(x, y) {
    if (x === "A") {
        if (y === "X") return 1 + 3;
        else if (y === "Y") return 2 + 6;
        else return 3 + 0;
    } else if (x === "B") {
        if (y === "X") return 1 + 0;
        else if (y === "Y") return 2 + 3;
        else return 3 + 6;
    } else if (x === "C") {
        if (y === "X") return 1 + 6;
        else if (y === "Y") return 2 + 0;
        else return 3 + 3;
    } else return 0;
}

function part1() {
    return input
        .map(str => str.split(" "))
        .map(arr => round1(arr[0], arr[1]))
        .reduce((sum, points) => sum + points);
}

function round2(x, y) {
    if (x === "A") {
        if (y === "X") return 3 + 0;
        else if (y === "Y") return 1 + 3;
        else return 2 + 6;
    } else if (x === "B") {
        if (y === "X") return 1 + 0;
        else if (y === "Y") return 2 + 3;
        else return 3 + 6;
    } else if (x === "C") {
        if (y === "X") return 2 + 0;
        else if (y === "Y") return 3 + 3;
        else return 1 + 6;
    } else return 0;
}

function part2() {
    return input
        .map(str => str.split(" "))
        .map(arr => round2(arr[0], arr[1]))
        .reduce((sum, points) => sum + points);
}

console.log(part1());
console.log(part2());