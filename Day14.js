function parseInput() {
    return require("fs")
        .readFileSync("Day14.txt")
        .toString()
        .split("\n")
        .map(line => line.split("->")
            .map(points => {
                const [x, y] = points.split(",").map(str => +str);
                return {x, y};
            }));

}

function draw(store, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i + 1] === undefined) {
            store.add(arr[i].x + "," + arr[i].y);
        } else if (arr[i].x === arr[i + 1].x) {
            for (let j = Math.min(arr[i].y, arr[i + 1].y); j <= Math.max(arr[i].y, arr[i + 1].y); j++) {
                store.add(arr[i].x + "," + j);
            }
        } else {
            for (let j = Math.min(arr[i].x, arr[i + 1].x); j <= Math.max(arr[i].x, arr[i + 1].x); j++) {
                store.add(j + "," + arr[i].y);
            }
        } 
    }
}

function part1() {
    const occupied = new Set();
    parseInput().forEach(arr => draw(occupied, arr));
    const maxY = Array
        .from(occupied)
        .reduce((max, str) => Math.max(str.split(",")[1], max), 0);
    let sandCount = 0;

    while (true) {
        const start = {x: 500, y: 0};
        while (start.y <= maxY) {
            if (!occupied.has(start.x + "," + (start.y + 1))) {
                start.y++;
            } else if (!occupied.has((start.x - 1) + "," + (start.y + 1))) {
                start.x--;
                start.y++;
            } else if (!occupied.has((start.x + 1) + "," + (start.y + 1))) {
                start.x++;
                start.y++
            } else {
                occupied.add(start.x + "," + start.y);
                sandCount++;
                break;
            }
        }
        if (start.y > maxY) break;
    }
    return sandCount;
}

function part2() {
    const occupied = new Set();
    parseInput().forEach(arr => draw(occupied, arr));
    const maxY = Array
        .from(occupied)
        .reduce((max, str) => Math.max(str.split(",")[1], max), 0) + 2;
    let sandCount = 0;

    while (true) {
        const start = {x: 500, y: 0};
        while (true) {
            if (start.y === maxY - 1) {
                occupied.add(start.x + "," + start.y);
                sandCount++;
                break;
            } else if (!occupied.has(start.x + "," + (start.y + 1))) {
                start.y++;
            } else if (!occupied.has((start.x - 1) + "," + (start.y + 1))) {
                start.x--;
                start.y++;
            } else if (!occupied.has((start.x + 1) + "," + (start.y + 1))) {
                start.x++;
                start.y++
            } else {
                occupied.add(start.x + "," + start.y);
                sandCount++;
                break;
            }
        }
        if (start.x === 500 & start.y === 0) break;
    }
    return sandCount;
}

console.log(part1());
console.log(part2());