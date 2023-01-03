function parseInput() {
    return require("fs")
        .readFileSync("Day20.txt")
        .toString()
        .split("\n")
        .map((num, i) => ({num: +num, i: i}));
}

function mix(arr, reference) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const move = reference[i];
        const index = arr.findIndex(obj => obj.num === move.num && obj.i === move.i);
        const temp = arr[index];
        const newIndex = (index + temp.num) % (len - 1);
        arr.splice(index, 1);
        arr.splice(newIndex, 0, temp);
    }
}

function part1() {
    const arr = parseInput();
    const ref = parseInput();
    const len = arr.length;
    mix(arr, ref);
    const finalArr = arr.map(obj => obj.num);
    const index0 = finalArr.findIndex(num => num === 0);

    return finalArr[(1000 + index0) % len] + finalArr[(2000 + index0) % len] + finalArr[(3000 + index0) % len];
}

function part2() {
    const key = 811589153;
    const arr = parseInput().map(obj => ({num: obj.num * key, i: obj.i}));
    const ref = parseInput().map(obj => ({num: obj.num * key, i: obj.i}));
    const len = arr.length;

    for (let i = 0; i < 10; i++) {
        mix(arr, ref);
    }
    
    const finalArr = arr.map(obj => obj.num);
    const index0 = finalArr.findIndex(num => num === 0);

    return finalArr[(1000 + index0) % len] + finalArr[(2000 + index0) % len] + finalArr[(3000 + index0) % len];
}

console.log(part1())
console.log(part2())