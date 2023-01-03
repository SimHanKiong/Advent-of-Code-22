function parseInput() {
    return require("fs")
        .readFileSync("Day18.txt")
        .toString()
        .split("\n")
        .map(line => {
            const [a, b , c] = line.split(",");
            const [x, y , z] = [+a, +b, +c];
            return {x, y, z};
        });
}

function part1() {
    const queue = parseInput();
    const plotted = [];
    let surfaceArea = 0;

    for (const cube of queue) {
        surfaceArea += 6;
        plotted.forEach(point => {
            if ((point.x === cube.x && point.y === cube.y && Math.abs(point.z - cube.z) === 1) ||
                (point.y === cube.y && point.z === cube.z && Math.abs(point.x - cube.x) === 1) || 
                (point.x === cube.x && point.z === cube.z && Math.abs(point.y - cube.y) === 1)) {
                    surfaceArea -= 2;
                }
        });
        plotted.push(cube);
    }
    return surfaceArea;
}

function buildChecklist(x, y, z) {
    const arr = [[x + 1, y, z], [x - 1, y, z], [x, y + 1, z], [x, y - 1, z], [x, y, z + 1], [x, y, z - 1]];
    return arr.map(arr => {
        const [x, y, z] = arr;
        return {x, y, z};
    });
}

function part2() {
    const filled = new Set(parseInput().map(obj => JSON.stringify(obj)));
    const min = parseInput().reduce((obj, acc) => {
        const minX = Math.min(obj.x, acc.x);
        const minY = Math.min(obj.y, acc.y);
        const minZ = Math.min(obj.z, acc.z);
        return {x: minX, y: minY, z: minZ};
    });
    const max = parseInput().reduce((obj, acc) => {
        const maxX = Math.max(obj.x, acc.x);
        const maxY = Math.max(obj.y, acc.y);
        const maxZ = Math.max(obj.z, acc.z);
        return {x: maxX, y: maxY, z: maxZ};
    }); 

    const flood = new Set(parseInput().map(obj => JSON.stringify(obj)));

    function getFlooded(obj) {
        if (obj.x < min.x - 1 || obj.y < min.y - 1 || obj.z < min.z - 1|| 
            obj.x > max.x + 1 || obj.y > max.y + 1 || obj.z > max.z + 1) {
        } else {
            flood.add(JSON.stringify(obj));
            const direction = buildChecklist(obj.x, obj.y, obj.z)
            if (!flood.has(JSON.stringify(direction[0]))) getFlooded(direction[0]);
            if (!flood.has(JSON.stringify(direction[1]))) getFlooded(direction[1]);
            if (!flood.has(JSON.stringify(direction[2]))) getFlooded(direction[2]);
            if (!flood.has(JSON.stringify(direction[3]))) getFlooded(direction[3]);
            if (!flood.has(JSON.stringify(direction[4]))) getFlooded(direction[4]);
            if (!flood.has(JSON.stringify(direction[5]))) getFlooded(direction[5]);
        }
    }    
    getFlooded(min);
    
    const inside = new Set();

    for (let i = min.x; i <= max.x; i++) {
        for (let j = min.y; j <= max.y; j++) {
            for (let k = min.z; k <= max.z; k++) {
                const str = JSON.stringify({x: i, y: j, z: k});
                if (!flood.has(str)) inside.add(str);
            }
        }
    }

    const queue = Array.from(inside).map(str => JSON.parse(str));
    const plotted = [];
    let surfaceArea = 0;

    for (const cube of queue) {
        surfaceArea += 6;
        plotted.forEach(point => {
            if ((point.x === cube.x && point.y === cube.y && Math.abs(point.z - cube.z) === 1) ||
                (point.y === cube.y && point.z === cube.z && Math.abs(point.x - cube.x) === 1) || 
                (point.x === cube.x && point.z === cube.z && Math.abs(point.y - cube.y) === 1)) {
                    surfaceArea -= 2;
                }
        });
        plotted.push(cube);
    }

    return part1() - surfaceArea;
}

console.log(part1());
console.log(part2());
