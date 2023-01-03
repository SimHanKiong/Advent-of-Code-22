const fs = require("fs");
const input = fs.readFileSync("Day3.txt").toString().split("\n");

function splitBag(str) {
    const bag = [];
    const middle = str.length / 2;
    bag.push(str.slice(0, middle));
    bag.push(str.slice(middle));
    return bag;
}

function cmpCompartments(arr) {
    for (let char of arr[1]) {
        const index = arr[0].indexOf(char)
        if (index !== -1) {
            return arr[0][index];
        }
    }
}

function convertPriority(letter) {
    if (/[a-z]/.test(letter)) {
        return letter.charCodeAt(0) - 96;
    } else {
        return letter.charCodeAt(0) - 38;
    }
}

function part1() {
    return input
        .map(x => convertPriority(cmpCompartments(splitBag(x))))
        .reduce((sum, val) => sum + val);   
}

function compareGroup(arr) {
    const temp = [];
    for (let char of arr[1]) {
        const index = arr[0].indexOf(char)
        if (index !== -1) {
            temp.push(arr[0][index]);
        }
    }
    for (let char of arr[2]) {
        const index = temp.indexOf(char)
        if (index !== -1) {
            return temp[index];
        }
    }
}

function part2() {
    const newArr = [];
    for (let i = 0; i < input.length; i += 3) {
        newArr.push(input.slice(i, i + 3));
    }
    return newArr
        .map(x => convertPriority(compareGroup(x)))
        .reduce((sum, val) => sum + val);
}

console.log(part1());
console.log(part2());