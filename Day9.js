const fs = require("fs");
const input = fs.readFileSync("Day9.txt").toString().split("\n");

function move(h, t) {
    if (Math.abs(h[0] - t[0]) <= 1 && Math.abs(h[1] - t[1]) <= 1) {
    } else {
        if (h[0] > t[0]) t[0]++;
        else if (h[0] < t[0]) t[0]--;
        if (h[1] > t[1]) t[1]++;
        else if (h[1] < t[1]) t[1]--;
    }
}

function part1() {
    const motions = input.map(line => line.split(" "));
    let rope = [[0, 0], [0, 0]];
    let visited = [[0, 0]];
    
    for (let line of motions) {
        for (let i = 0; i < parseInt(line[1], 10); i++) {
            if (line[0] === 'R') rope[0][0] += 1;
            else if (line[0] === 'L') rope[0][0] -= 1;
            else if (line [0] === 'U') rope[0][1] += 1;
            else rope[0][1] -= 1;
            move(rope[0], rope[1]);
            if(!visited.some(arr => arr[0] === rope[1][0] && arr[1] === rope[1][1])) visited.push([...rope[1]]);
        }
    }
    return visited.length;
}

function part2() {
    const motions = input.map(line => line.split(" "));
    let rope = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    let visited = [[0, 0]];
    
    for (let line of motions) {
        for (let i = 0; i < parseInt(line[1], 10); i++) {
            if (line[0] === 'R') rope[0][0] += 1;
            else if (line[0] === 'L') rope[0][0] -= 1;
            else if (line [0] === 'U') rope[0][1] += 1;
            else rope[0][1] -= 1;
            
            for (let j = 0; j < 9; j++) {
                move(rope[j], rope[j + 1]);
            }

            if(!visited.some(arr => arr[0] === rope[9][0] && arr[1] === rope[9][1])) visited.push([...rope[9]]);
        }
    }
    return visited.length;
}

console.log(part1());
console.log(part2());