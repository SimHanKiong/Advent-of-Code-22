const fs = require("fs");
const input = fs.readFileSync("Day11.txt").toString().split("\n\n");

function operation(a, op, b) {
    if (op === "*") {
        if (b === "old") return a * a;
        else return a * b;
    } else {
        if (b === "old") return a + a;
        else return a + b;
    }
}

function round1(arr) {
    for (let obj of arr) {
        while (obj.items.length !== 0) {
            const item = obj.items.shift();
            const newItem = Math.floor(operation(item, obj.op[1], obj.op[2]) / 3);
            if (newItem % obj.test === 0) arr[obj.ifTrue].items.push(newItem);
            else arr[obj.ifFalse].items.push(newItem);
            obj.count++;
        }
    }
}

function part1() {
    const monkey = input.map(m => {
        const arr = m.split("\n");
        return {
            items: arr[1].match(/\d+/g).map(str => parseInt(str, 10)),
            op: arr[2].match(/\d+|(old)|\*|\+/g).map(str => /\d/.test(str) ? parseInt(str, 10) : str),
            test: arr[3].match(/\d+/g).map(str => parseInt(str, 10))[0],
            ifTrue: arr[4].match(/\d+/g).map(str => parseInt(str, 10))[0],
            ifFalse: arr[5].match(/\d+/g).map(str => parseInt(str, 10))[0],
            count: 0
        };
    });
    
    for (let i = 0; i < 20; i++) {
        round1(monkey);
    }
    monkey.sort((a, b) => b.count - a.count);

    return monkey[0].count * monkey[1].count;

}

function round2(arr, mod) {
    for (let obj of arr) {
        while (obj.items.length !== 0) {
            const item = obj.items.shift() % mod;
            const newItem = operation(item, obj.op[1], obj.op[2]);
            if (newItem % obj.test === 0) arr[obj.ifTrue].items.push(newItem);
            else arr[obj.ifFalse].items.push(newItem);
            obj.count++;
        }
    }
}

function part2() {
    const monkey = input.map(m => {
        const arr = m.split("\n");
        return {
            items: arr[1].match(/\d+/g).map(str => parseInt(str, 10)),
            op: arr[2].match(/\d+|(old)|\*|\+/g).map(str => /\d/.test(str) ? parseInt(str, 10) : str),
            test: arr[3].match(/\d+/g).map(str => parseInt(str, 10))[0],
            ifTrue: arr[4].match(/\d+/g).map(str => parseInt(str, 10))[0],
            ifFalse: arr[5].match(/\d+/g).map(str => parseInt(str, 10))[0],
            count: 0
        };
    });
    
    const mod = monkey.reduce((x, y) => x * y.test, 1);

    for (let i = 0; i < 10000; i++) {
        round2(monkey, mod);
    }
    monkey.sort((a, b) => b.count - a.count);

    return monkey[0].count * monkey[1].count;
}

console.log(part1());
console.log(part2());
