function parseInput() {
    const fs = require("fs");
    return fs
        .readFileSync("Day13.txt")
        .toString();        
}

function compare(arr1, arr2) {
    const length = Math.max(arr1.length, arr2.length);
    for (let i = 0; i < length; i++) {
        if (arr1[i] === undefined) {
            return true;
        } else if (arr2[i] === undefined) {
            return false;
        } else if (Number.isInteger(arr1[i]) && Number.isInteger(arr2[i])) {
            if (arr1[i] !== arr2[i]) return arr1[i] < arr2[i];
        } else if (Number.isInteger(arr1[i])) {
            const flag = compare([arr1[i]], arr2[i]);
            if (flag !== undefined) return flag;
        } else if (Number.isInteger(arr2[i])) {
            const flag = compare(arr1[i], [arr2[i]]);
            if (flag !== undefined) return flag;
        } else {
            const flag = compare(arr1[i], arr2[i]);
            if (flag !== undefined) return flag;
        }
    }
}

function part1() {
    return parseInput()
        .split("\n\n")
        .map(pair => pair.split("\n").map(list => eval(list)))
        .map((pair, index) => compare(pair[0], pair[1]) ? index + 1 : 0)
        .reduce((sum, index) => sum + index);
}

function part2() {
    let i = 1;
    let j = 1;
    const input = parseInput()
        .split("\n")
        .filter(line => line !== "")
        .map(arr => eval(arr))
        .forEach(arr => {
            if (compare(arr, [[2]])) i++;
            if (compare(arr, [[6]])) j++;
        });

    return Math.min(i, j) * (Math.max(i, j) + 1);
}

console.log(part1());
console.log(part2());