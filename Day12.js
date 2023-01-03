const path = require("path");

function parseInput() {
    const fs = require("fs");
    return fs
        .readFileSync("Day12.txt")
        .toString()
        .split("\n")
        .map(row => row.split(""));
}

function part1() {
    const input = parseInput();
    const rows = input.length;
    const cols = input[0].length;
    const start = [];
    let end = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (input[i][j] === "S") {
                start.push([i, j]);
                input[i][j] = "a".charCodeAt(0);
            } else if (input[i][j] === "E") {
                end = [i, j];
                input[i][j] = "z".charCodeAt(0);
            } else {
                input[i][j] = input[i][j].charCodeAt(0);
            }
        }
    }

    function paths(i, j) {
        const possible = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];
        const valid = []

        for (const move of possible) {
            if (move[0] < 0 || move[0] >= rows || move[1] < 0 || move[1] >= cols) {
            } else if (input[move[0]][move[1]] > input[i][j] + 1) {
            } else {
                valid.push(move);
            }
        }
        return valid;
    }

    const queue = start.map(arr => ({pos: [...arr], steps: 0}));
    const visited = [];

    while (queue.length > 0) {
        const first = queue.shift();

        if (first.pos[0] === end[0] && first.pos[1] === end[1]) {
            return first.steps;
        }

        const moves = paths(first.pos[0], first.pos[1]);
        
        for (const move of moves) {
            if (!visited.some(arr => arr[0] === move[0] && arr[1] === move[1])) {
                queue.push({pos: move, steps: first.steps + 1});
                visited.push(move);
            }
        }
    }
}

function part2() {
    const input = parseInput();
    const rows = input.length;
    const cols = input[0].length;
    const start = [];
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (input[i][j] === "S") {;
                input[i][j] = "a".charCodeAt(0);
            } else if (input[i][j] === "E") {
                start.push([i, j]);
                input[i][j] = "z".charCodeAt(0);
            } else {
                input[i][j] = input[i][j].charCodeAt(0);
            }
        }
    }

    function paths(i, j) {
        const possible = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]];
        const valid = []

        for (const move of possible) {
            if (move[0] < 0 || move[0] >= rows || move[1] < 0 || move[1] >= cols) {
            } else if (input[move[0]][move[1]] + 1 < input[i][j]) {
            } else {
                valid.push(move);
            }
        }
        return valid;
    }

    const queue = start.map(arr => ({pos: [...arr], steps: 0}));
    const visited = [];

    while (queue.length > 0) {
        const first = queue.shift();

        if (input[first.pos[0]][first.pos[1]] === "a".charCodeAt(0)) {
            return first.steps;
        }

        const moves = paths(first.pos[0], first.pos[1]);
        
        for (const move of moves) {
            if (!visited.some(arr => arr[0] === move[0] && arr[1] === move[1])) {
                queue.push({pos: move, steps: first.steps + 1});
                visited.push(move);
            }
        }
    }
}

console.log(part1());
console.log(part2());