function parseInput() {
    return require("fs")
        .readFileSync("Day21.txt")
        .toString()
        .split("\n")
        .map(line => {
            const arr = line.split(": ");
            if (/\d+/.test(arr[1])) arr[1] = +arr[1];
            else arr[1] = arr[1].split(" ");
            return arr;
        });
}

function operation(a, op, b) {
    if (!Number.isInteger(a) || !Number.isInteger(b)) return [a, op, b];
    else if (op === "+") return a + b;
    else if (op === "-") return a - b;
    else if (op === "*") return a * b;
    else return a / b;
}

function part1() {
    const targetMonkey = "root";
    const monkeys = Object.fromEntries(parseInput());
    
    function helper(monkey) {
        if (Number.isInteger(monkeys[monkey])) {
            return monkeys[monkey];
        } else {
            const arr = monkeys[monkey];
            const LHS = helper(arr[0]);
            const op = arr[1];
            const RHS = helper(arr[2]);
            return operation(LHS, op, RHS);
        }
    }

    return helper(targetMonkey);
}

function part2() {
    const monkeys = Object.fromEntries(parseInput());
    monkeys["humn"] = "x";
    
    function helper(monkey) {
        if (Number.isInteger(monkeys[monkey])) {
            return monkeys[monkey];
        } else if (monkeys[monkey] === "x") {
            return "x";
        } else {
            const arr = monkeys[monkey];
            const LHS = helper(arr[0]);
            const op = arr[1];
            const RHS = helper(arr[2]);
            return operation(LHS, op, RHS);
        }
    }

    const LHS = helper(monkeys["root"][0]);
    const RHS = helper(monkeys["root"][2]);

    function helper2(arr, ans) {
        if (arr === "x") {
            return ans;
        } else {
            const LHS = arr[0];
            const op = arr[1];
            const RHS = arr[2];
            if (op === "+") {
                if (Number.isInteger(LHS)) return helper2(RHS, ans - LHS);
                else return helper2(LHS, ans - RHS);
            } else if (op === "-") {
                if (Number.isInteger(LHS)) return helper2(RHS, LHS - ans);
                else return helper2(LHS, ans + RHS);
            } else if (op === "*") {
                if (Number.isInteger(LHS)) return helper2(RHS, ans / LHS);
                else return helper2(LHS, ans / RHS);
            } else {
                if (Number.isInteger(LHS)) return helper2(RHS, LHS / ans);
                else return helper2(LHS, ans * RHS);
            }
        }
    }

    if (Number.isInteger(LHS)) return helper2(RHS, LHS);
    else return helper2(LHS, RHS);
}

console.log(part1());
console.log(part2());