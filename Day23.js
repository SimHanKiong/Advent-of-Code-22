const { time, timeLog } = require("console");

function parseInput() {
    return require("fs")
        .readFileSync("Day23.txt")
        .toString()
        .split("\n")
        .map(line => line.split(""));
}

function around(x, y, elves) {
    return elves.includes(JSON.stringify({r: x, c: y + 1})) || 
        elves.includes(JSON.stringify({r: x, c: y - 1})) ||
        elves.includes(JSON.stringify({r: x + 1, c: y})) || 
        elves.includes(JSON.stringify({r: x + 1, c: y + 1})) ||
        elves.includes(JSON.stringify({r: x + 1, c: y - 1})) ||
        elves.includes(JSON.stringify({r: x - 1, c: y})) ||
        elves.includes(JSON.stringify({r: x - 1, c: y + 1})) ||
        elves.includes(JSON.stringify({r: x - 1, c: y - 1}))
}

function direction(x, y, i, elves, count) {
    if (count === 4) return null;

    const next = (i + 1) % 4;
    const north = () => {
        if (elves.includes(JSON.stringify({r: x - 1, c: y})) || 
            elves.includes(JSON.stringify({r: x - 1, c: y + 1})) ||
            elves.includes(JSON.stringify({r: x - 1, c: y - 1}))) {
                return direction(x, y, next, elves, count + 1);
        } else {
            return JSON.stringify({r: x - 1, c: y});
        }
    }
    const south = () => {
        if (elves.includes(JSON.stringify({r: x + 1, c: y})) || 
            elves.includes(JSON.stringify({r: x + 1, c: y + 1})) ||
            elves.includes(JSON.stringify({r: x + 1, c: y - 1}))) {
                return direction(x, y, next, elves, count + 1);
        } else {
            return JSON.stringify({r: x + 1, c: y});
        }
    }
    const west = () => {
        if (elves.includes(JSON.stringify({r: x, c: y - 1})) || 
            elves.includes(JSON.stringify({r: x + 1, c: y - 1})) ||
            elves.includes(JSON.stringify({r: x - 1, c: y - 1}))) {
                return direction(x, y, next, elves, count + 1);
        } else {
            return JSON.stringify({r: x, c: y - 1});
        }
    }
    const east = () => {
        if (elves.includes(JSON.stringify({r: x, c: y + 1})) || 
            elves.includes(JSON.stringify({r: x + 1, c: y + 1})) ||
            elves.includes(JSON.stringify({r: x - 1, c: y + 1}))) {
                return direction(x, y, next, elves, count + 1);
        } else {
            return JSON.stringify({r: x, c: y + 1});
        }
    }
    const arr = [north, south, west, east]
    return arr[i % 4]();
}

function part1() {
    let elves = [];
    parseInput().forEach((line, r) => {
        line.forEach((char, c) => {
            if (char === "#") elves.push(JSON.stringify({r, c}));
        })
    });

    let round = 0;
    while (round < 10) {
        let moves = [];
        elves.forEach((str, i) => {
            const elf = JSON.parse(str);
            if (around(elf.r, elf.c, elves)) {
                const move = direction(elf.r, elf.c, round, elves, 0);
                if (move !== null) moves.push({proposed: move, pos: i});
            }})

        const validMoves = [];
        while (moves.length > 0) {
            const first = moves.shift();
            if (moves.some(obj => obj.proposed === first.proposed)) {
                moves = moves.filter(obj => obj.proposed !== first.proposed);
            } else {
                validMoves.push(first);
            }
        }

        validMoves.forEach(obj => {
            const index = obj.pos;
            elves.splice(index, 1, obj.proposed);
        });

        round++;
    }

    const min = elves.reduce((min, str) => {
        const point = JSON.parse(str);
        const minR = Math.min(min.r, point.r);
        const minC = Math.min(min.c, point.c);
        return {r: minR, c: minC};
    }, {r: Infinity, c: Infinity});
    const max = elves.reduce((max, str) => {
        const point = JSON.parse(str);
        const maxR = Math.max(max.r, point.r);
        const maxC = Math.max(max.c, point.c);
        return {r: maxR, c: maxC};
    }, {r: 0, c: 0});

    let empty = 0;

    for (let r = min.r; r <= max.r; r++) {
        for (let c = min.c; c <= max.c; c++) {
            if (!elves.includes(JSON.stringify({r, c}))) empty++;
        }
    }

    return empty;
}

function part2() {
    let elves = [];
    parseInput().forEach((line, r) => {
        line.forEach((char, c) => {
            if (char === "#") elves.push(JSON.stringify({r, c}));
        })
    });

    let round = 0;
    while (true) {
        let moves = [];
        elves.forEach((str, i) => {
            const elf = JSON.parse(str);
            if (around(elf.r, elf.c, elves)) {
                const move = direction(elf.r, elf.c, round, elves, 0);
                if (move !== null) moves.push({proposed: move, pos: i});
            }})

        const validMoves = [];
        while (moves.length > 0) {
            const first = moves.shift();
            if (moves.some(obj => obj.proposed === first.proposed)) {
                moves = moves.filter(obj => obj.proposed !== first.proposed);
            } else {
                validMoves.push(first);
            }
        }

        validMoves.forEach(obj => {
            const index = obj.pos;
            elves.splice(index, 1, obj.proposed);
        });

        round++;
        if (validMoves.length === 0) break;
    }
    return round;
}

console.log(part1());
console.log(part2());