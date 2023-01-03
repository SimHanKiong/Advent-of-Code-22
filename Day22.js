function parseInput() {
    return require("fs")
        .readFileSync("test.txt")
        .toString()
        .split("\n\n");
}

function part1() {
    const map = parseInput()[0]
        .split("\n")
        .map(line => line.split(""));
    const instructions = parseInput()[1].match(/\d+|L|R/g);
    
    let pos = {r: 0, c: map[0].findIndex(char => char === ".")};
    let face = 0;

    while (instructions.length > 0) {
        const instruction = instructions.shift();
        if (instruction === "R") {
            face = ((face + 1) % 4 + 4) % 4;
        } else if (instruction === "L") {
            face = ((face - 1) % 4 + 4) % 4;
        } else if (/\d+/.test(instruction)) {
            let times = +instruction;
            while (times > 0) {
                if (face === 3) {
                    if (map[pos.r - 1] === undefined || map[pos.r - 1][pos.c] === undefined || map[pos.r - 1][pos.c] === " ") {
                        for (let i = map.length - 1; i >= 0; i--) {
                            if (map[i][pos.c] === ".") {
                                pos.r = i;
                                times--;
                                break;
                            } else if (map[i][pos.c] === "#") {
                                times = 0;
                                break;
                            }
                        }
                    } else if (map[pos.r - 1][pos.c] === "#") {
                        times = 0;
                    } else {
                        pos.r--;
                        times--;
                    }
                } else if (face === 0) {
                    if (map[pos.r][pos.c + 1] === undefined || map[pos.r][pos.c + 1] === " ") {
                        for (let i = 0; i < map[pos.r].length; i++) {
                            if (map[pos.r][i] === ".") {
                                pos.c = i;
                                times--;
                                break;
                            } else if (map[pos.r][i] === "#") {
                                times = 0;
                                break;
                            }
                        }
                    } else if (map[pos.r][pos.c + 1] === "#") {
                        times = 0;
                    } else {
                        pos.c++;
                        times--;
                    }
                } else if (face === 1) {
                    if (map[pos.r + 1] === undefined || map[pos.r + 1][pos.c] === undefined || map[pos.r + 1][pos.c] === " ") {
                        for (let i = 0; i < map.length; i++) {
                            if (map[i][pos.c] === ".") {
                                pos.r = i;
                                times--;
                                break;
                            } else if (map[i][pos.c] === "#") {
                                times = 0;
                                break;
                            }
                        }
                    } else if (map[pos.r + 1][pos.c] === "#") {
                        times = 0;
                    } else {
                        pos.r++;
                        times--;
                    }
                } else if (face === 2) {
                    if (map[pos.r][pos.c - 1] === undefined || map[pos.r][pos.c - 1] === " ") {
                        for (let i = map[pos.r].length - 1; i >= 0; i--) {
                            if (map[pos.r][i] === ".") {
                                pos.c = i;
                                times--;
                                break;
                            } else if (map[pos.r][i] === "#") {
                                times = 0;
                                break;
                            }
                        }
                    } else if (map[pos.r][pos.c - 1] === "#") {
                        times = 0;
                    } else {
                        pos.c--;
                        times--;
                    }
                } else {
                    return "face calculation error";
                }
            } 
        } else {
            return "input error";
        }
    }
    return (pos.r + 1) * 1000 + (pos.c + 1) * 4 + face;
}

//console.log(part1());
console.log(parseInput());