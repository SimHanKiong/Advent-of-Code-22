const fs = require("fs");
const input = fs.readFileSync("Day5.txt").toString().split("\n");

function move1(arr, times, from, to) {
    if (times !== 0) {
        const remove = arr[from].pop();
        arr[to].push(remove);
        return move1(arr, times - 1, from, to);
    }
}

function part1() {
    let data = [];
    let instructions = [...input];

    let i = 0;
    while (input[i] !== "") {
        data.unshift(input[i]);
        instructions.shift();
        i++;
    }
    instructions.shift();

    const stacks = [];
    data = data.map(row => row.split(""));

    for (let c = 1; c < data[0].length; c += 4) {
        const stack = [];
        for (let r = 1; r < data.length; r++) {
            if (data[r][c] !== " ") stack.push(data[r][c]);
        }
        stacks.push(stack);
    }
    
    instructions = instructions.map(str => str.split(" ").filter(char => /\d/.test(char)));
    instructions.forEach(arr => move1(stacks, arr[0], arr[1] - 1, arr[2] - 1));

    return stacks.reduce((str, arr) => str + arr[arr.length - 1], "");

}

function move2(arr, times, from, to) {
    const remove = arr[from].splice(-times, times);
    arr[to].push(...remove);   
}

function part2() {
    let data = [];
    let instructions = [...input];

    let i = 0;
    while (input[i] !== "") {
        data.unshift(input[i]);
        instructions.shift();
        i++;
    }
    instructions.shift();

    const stacks = [];
    data = data.map(row => row.split(""));

    for (let c = 1; c < data[0].length; c += 4) {
        const stack = [];
        for (let r = 1; r < data.length; r++) {
            if (data[r][c] !== " ") stack.push(data[r][c]);
        }
        stacks.push(stack);
    }
    
    instructions = instructions.map(str => str.split(" ").filter(char => /\d/.test(char)));
    instructions.forEach(arr => move2(stacks, arr[0], arr[1] - 1, arr[2] - 1));

    return stacks.reduce((str, arr) => str + arr[arr.length - 1], "");

}

console.log(part1());
console.log(part2());
