const fs = require("fs");
const input = fs.readFileSync("Day8.txt").toString().split("\n");

function part1() {
    const treeArr = input.map(str => str.split("").map(arr => parseInt(arr, 10)));
    const rows = treeArr.length;
    const cols = treeArr[0].length;

    function check(i, j) {
        let up = true;
        let left = true;
        let right = true;
        let down = true;
        const val = treeArr[i][j];

        for (let r = i - 1; r >= 0; r--) {
            up = up && val > treeArr[r][j];
        }
        for (let r = i + 1; r < rows; r++) {
            down = down && val > treeArr[r][j];
        }
        for (let c = j - 1; c >= 0; c--) {
            left = left && val > treeArr[i][c];
        }
        for (let c = j + 1; c < cols; c++) {
            right = right && val > treeArr[i][c];
        }

        return up || down || left || right ? 1 : 0;
    }

    let visibleTrees = 2 * rows + 2 * cols - 4;

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            visibleTrees += check(r, c);
        }
    }

    return visibleTrees;
}

function part2() {
    const treeArr = input.map(str => str.split("").map(arr => parseInt(arr, 10)));
    const rows = treeArr.length;
    const cols = treeArr[0].length;

    function check(i, j) {
        let up = 0;
        let left = 0;
        let right = 0;
        let down = 0;
        const val = treeArr[i][j];

        for (let r = i - 1; r >= 0; r--) {
            if (val > treeArr[r][j]) {
                up++;
            } else {
                up++;
                break;
            } 
        }
        for (let r = i + 1; r < rows; r++) {
            if (val > treeArr[r][j]) {
                down++;
            } else {
                down++;
                break;
            }
        }
        for (let c = j - 1; c >= 0; c--) {
            if (val > treeArr[i][c]) {
                left++;
            } else {
                left++;
                break;
            }
        }
        for (let c = j + 1; c < cols; c++) {
            if (val > treeArr[i][c]) {
                right++;
            } else {
                right++;
                break;
            }
        }

        return up * down * left * right;
    }

    let score = 0;

    for (let r = 1; r < rows - 1; r++) {
        for (let c = 1; c < cols - 1; c++) {
            score = Math.max(score, check(r, c));
        }
    }

    return score;
}

console.log(part1());
console.log(part2());