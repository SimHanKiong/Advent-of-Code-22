function parseInput() {
    return require("fs")
        .readFileSync("Day15.txt")
        .toString()
        .split("\n")
        .map(str => str.match(/-?\d+/g))
        .map(arr => {
            const [sx, sy, bx, by] = arr.map(char => +char);
            return {sx, sy, bx, by};
        });     
}

function part1() {
    const targetRow = 2000000;
    const filled = new Set();
    let noBeacon = 0;

    parseInput().forEach(obj => {
        if (obj.by === targetRow) filled.add(obj.bx);
        const dist = Math.abs(obj.sx - obj.bx) + Math.abs(obj.sy - obj.by);
        if (Math.abs(obj.sy - targetRow) <= dist) {
            const start = obj.sx - dist + Math.abs(obj.sy - targetRow);
            const end = obj.sx + dist - Math.abs(obj.sy - targetRow);
            for (let i = start; i <= end; i++) {
                if (!filled.has(i)) {
                    filled.add(i);
                    noBeacon++;
                }
            }
        }
    });
    return noBeacon;
}

function possible(x, y, max) {
    if (x < 0 || x > max || y < 0 || y > max) return false;
    for (const obj of parseInput()) {
        const beaconToSensor = Math.abs(obj.sx - obj.bx) + Math.abs(obj.sy - obj.by);
        const pointToSensor = Math.abs(obj.sx - x) + Math.abs(obj.sy - y);
        if (pointToSensor <= beaconToSensor) return false;
    }
    return true;
}

function part2() {
    const max = 4000000;

    for (const obj of parseInput()) {
        const dist = Math.abs(obj.sx - obj.bx) + Math.abs(obj.sy - obj.by);
        const possiblePoints = [];
        for (let i = dist; i >= 0; i--) {
            possiblePoints.push({x: obj.sx + i + 1, y: obj.sy - Math.abs(dist - i)});
            possiblePoints.push({x: obj.sx - i - 1, y: obj.sy + Math.abs(dist - i)});
        }
        for (let point of possiblePoints) {
            if (possible(point.x, point.y, max)) return point.x * 4000000 + point.y;
        }
    }
}

console.log(part1());
console.log(part2());
