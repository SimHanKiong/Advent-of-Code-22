const fs = require("fs");
const input = fs.readFileSync("Day10.txt").toString().split("\n");

function part1() {
    let x = 1;
    let xValues = [];

    for (let line of input) {
        if (line === 'noop') {
            xValues.push(x);
        } else {
            xValues.push(x);
            x += parseInt(line.split(" ")[1], 10);
            xValues.push(x);
        }
    }

    let sum = 0;
    
    for (let i = 20; i <= 220; i += 40) {
        sum += xValues[i - 2] * i;
    }

    return sum;
}

function part2() {
    let x = 1;
    let sprite = [0, 1, 2];
    let CRT = [];
    let row = [];
    let cycle = 1;

    function buildCRT() {
        if (sprite.includes(cycle - 1)) row.push("#");
        else row.push(".");
        cycle++;
        if (cycle === 41) {
            CRT.push([...row]);
            row = [];
            cycle -= 40;
        }
    }

    for (let line of input) {
        buildCRT();
    
        if (line !== 'noop') {
            buildCRT();
            x += parseInt(line.split(" ")[1], 10);
            sprite = [x - 1, x, x + 1];
        }
    }

    return CRT.map(row => row.join(""));
}

console.log(part1());
console.log(part2());