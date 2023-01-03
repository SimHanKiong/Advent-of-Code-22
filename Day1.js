function parseInput() {
    const fs = require("fs");
    return fs.readFileSync("Day1.txt").toString().split("\n");
}

function part1() {
    const newArr = [];
    let row = [];
    const input = parseInput();

    for (let i = 0; i < input.length; i++) {
        if (input[i] !== "") {
            row.push(input[i]);
        } else {
            newArr.push(row);
            row = [];
        }
    }
    newArr.push(row);

    return final = newArr
        .map(row => row.reduce((sum, val) => sum + parseInt(val, 10), 0))
        .reduce((max, val) => Math.max(max, val));
}

function part2() {
    const newArr = [];
    let row = [];
    const input = parseInput();
    
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== "") {
            row.push(input[i]);
        } else {
            newArr.push(row);
            row = [];
        }
    }
    newArr.push(row);

    const sorted = newArr
        .map(row => row.reduce((sum, val) => sum + parseInt(val, 10), 0))
        .sort((a, b) => b - a);
        
    return sorted[0] + sorted[1] + sorted[2];
}

console.log(part1());
console.log(part2());
