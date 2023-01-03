const fs = require("fs");
const input = fs.readFileSync("Day7.txt").toString().split("\n");

function part1() {
    let i = 0

    function helper(arr) {
        if (i === input.length) {
            return arr;
        } else if (input[i] === "$ cd ..") {
            i++;
            return arr;
        } else if (/^\d/.test(input[i])) {
            arr.push(input[i].split(" ")[0]);
            i++;
            return helper(arr);
        } else if (input[i].startsWith("$ cd")) {
            const temp = []
            i++;
            const result = helper(temp);
            arr.push(temp);
            return helper(arr);
        } else {
            i++;
            return helper(arr);
        }
    }

    const result = helper([]);
    let size = 0;

    function sum(arr) {
        let temp = 0;
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                temp += sum(arr[i]);
            } else {
                temp += parseInt(arr[i], 10);
            }
        }

        if (temp <= 100000) {
            size += temp;
        }

        return temp;
    }

    sum(result);
    return size;
}

function part2() {
    let i = 0

    function helper(arr) {
        if (i === input.length) {
            return arr;
        } else if (input[i] === "$ cd ..") {
            i++;
            return arr;
        } else if (/^\d/.test(input[i])) {
            arr.push(input[i].split(" ")[0]);
            i++;
            return helper(arr);
        } else if (input[i].startsWith("$ cd")) {
            const temp = []
            i++;
            const result = helper(temp);
            arr.push(temp);
            return helper(arr);
        } else {
            i++;
            return helper(arr);
        }
    }

    const result = helper([]);
    const size = [];

    function sum(arr) {
        let temp = 0;
        for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                temp += sum(arr[i]);
            } else {
                temp += parseInt(arr[i], 10);
            }
        }
        size.push(temp);
        return temp;
    }

    sum(result);
    size.sort((a, b) => a - b);
    const spaceNeeded = 30000000 - (70000000 - size[size.length - 1]);

    for (let space of size) {
        if (space > spaceNeeded) return space;
    }
}

console.log(part1());
console.log(part2());