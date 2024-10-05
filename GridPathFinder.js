export class GridPathFinder {
    constructor(row, column, notExistPotList) {
        this.row = row;
        this.column = column;
        this.notExistPotList = notExistPotList || [];
        this.passedPot = new Array(row * column).fill(false);
        this.path = new Array(row * column - notExistPotList.length).fill(null); // 固定长度的 path 数组
        this.noFullPath = true;
    }

    decideSingleBounds(bounds, singleBounds) {
        return (bounds & singleBounds) !== 0;
    }

    setPassedPotAndPath(...args) {
        if (args.length === 3) {
            const [p, a, b] = args;
            this.path[p] = a;
            this.setPassedPot(a, b);
        } else if (args.length === 1) {
            const [a] = args;
            this.setPassedPotAndPath(0, a, true);
        } else if (args.length === 2) {
            const [p, a] = args;
            this.setPassedPotAndPath(p, a, true);
        } else {
            throw new Error('Invalid number of arguments');
        }
    }

    decideBounds(pot) {
        let count = 0;
        if (pot < this.column) count += 1;
        if ((pot - (this.row - 1) * this.column) >= 0 && (pot - (this.row - 1) * this.column) < this.column) count += 2;
        if (pot % this.column === 0) count += 4;
        if (pot % this.column === this.column - 1) count += 8;
        return count;
    }

    passedPotIndexOutOfBounds(a) {
        return a < 0 || a >= this.column * this.row;
    }

    showPath() {
        for (let i = 0; i < this.path.length; i++) {
            console.log(this.path[i] + " ");
        }
    }

    getPath() {
        return this.path;
    }

    notExistPot(pot) {
        return this.notExistPotList.includes(pot);
    }

    getPassedPot(pot) {
        return this.passedPot[pot];
    }

    passedPotOrNotExistPot(a) {
        return this.notExistPot(a) || this.getPassedPot(a);
    }

    run(nowPosition) {
        let flag = false;
        let a = this.path[nowPosition];
        if (nowPosition === this.path.length - 1) {
            this.noFullPath = false;
            return;
        }

        // 左边是否可以走
        if (this.noFullPath &&
            !this.decideSingleBounds(this.decideBounds(a), 4) &&
            !this.passedPotIndexOutOfBounds(a - 1) &&
            !this.passedPotOrNotExistPot(a - 1)) {
            this.setPassedPotAndPath(nowPosition + 1, a - 1);
            this.run(nowPosition + 1);
            flag = true;
        }

        if (flag) {
            this.setPassedPot(a - 1, false);
            flag = false;
        }

        // 右边是否可以走
        if (this.noFullPath &&
            !this.decideSingleBounds(this.decideBounds(a), 8) &&
            !this.passedPotIndexOutOfBounds(a + 1) &&
            !this.passedPotOrNotExistPot(a + 1)) {
            this.setPassedPotAndPath(nowPosition + 1, a + 1);
            this.run(nowPosition + 1);
            flag = true;
        }

        if (flag) {
            this.setPassedPot(a + 1, false);
            flag = false;
        }

        // 上边是否可以走
        if (this.noFullPath &&
            !this.decideSingleBounds(this.decideBounds(a), 1) &&
            !this.passedPotIndexOutOfBounds(a - this.column) &&
            !this.passedPotOrNotExistPot(a - this.column)) {
            this.setPassedPotAndPath(nowPosition + 1, a - this.column);
            this.run(nowPosition + 1);
            flag = true;
        }

        if (flag) {
            this.setPassedPot(a - this.column, false);
            flag = false;
        }

        // 下边是否可以走
        if (this.noFullPath &&
            !this.decideSingleBounds(this.decideBounds(a), 2) &&
            !this.passedPotIndexOutOfBounds(a + this.column) &&
            !this.passedPotOrNotExistPot(a + this.column)) {
            this.setPassedPotAndPath(nowPosition + 1, a + this.column);
            this.run(nowPosition + 1);
            flag = true;
        }

        if (flag) {
            this.setPassedPot(a + this.column, false);
            flag = false;
        }
    }

    setPassedPot(a, b) {
        this.passedPot[a] = b;
    }

    isOneStroke(printPath = false) {
        const visited = new Array(this.row * this.column).fill(false);
        const path = []; // 用于记录路径

        let startCell = -1;

        // 找到第一个有效的单元格开始 DFS
        for (let i = 0; i < this.row * this.column; i++) {
            if (!this.notExistPot(i)) {
                startCell = i;
                break;
            }
        }

        if (startCell === -1) return false; // 没有有效的单元格

        // 获取有效邻居的辅助函数
        const getNeighbors = (i) => {
            const neighbors = [];
            if (i % this.column > 0 && !this.notExistPot(i - 1) && !visited[i - 1]) neighbors.push(i - 1);
            if (i % this.column < this.column - 1 && !this.notExistPot(i + 1) && !visited[i + 1]) neighbors.push(i + 1);
            if (i >= this.column && !this.notExistPot(i - this.column) && !visited[i - this.column]) neighbors.push(i - this.column);
            if (i < (this.row - 1) * this.column && !this.notExistPot(i + this.column) && !visited[i + this.column]) neighbors.push(i + this.column);
            return neighbors;
        };

        // DFS 检查连通性和确保每个单元格只访问一次
        const dfs = (i) => {
            if (visited[i]) return true; // 如果已经访问过，返回 true
            visited[i] = true;
            path.push(i); // 记录当前单元格到路径中
            const neighbors = getNeighbors(i);
            for (const neighbor of neighbors) {
                if (!dfs(neighbor)) return false; // 如果邻居不能满足条件，返回 false
            }
            return true;
        };

        const isValid = dfs(startCell);

        // 检查所有有效的单元格是否都被访问了一次
        for (let i = 0; i < this.row * this.column; i++) {
            if (!this.notExistPot(i) && !visited[i]) return false; // 不是所有有效的单元格都被访问了
        }

        // 检查路径是否连续
        for (let i = 0; i < path.length - 1; i++) {
            if (!this.areAdjacent(path[i], path[i + 1])) {
                console.log(`Path error: ${path[i]} and ${path[i + 1]} are not adjacent`);
                return false;
            }
        }

        // 如果 printPath 为 true，则打印路径
        if (printPath) {
            console.log('Path:', path.join(' -> '));
        }

        return isValid;
    }

    areAdjacent(cell1, cell2) {
        const col1 = cell1 % this.column;
        const col2 = cell2 % this.column;
        const row1 = Math.floor(cell1 / this.column);
        const row2 = Math.floor(cell2 / this.column);

        return (
            (row1 === row2 && Math.abs(col1 - col2) === 1) || // 水平相邻
            (col1 === col2 && Math.abs(row1 - row2) === 1)  // 垂直相邻
        );
    }

    resetPath() {
        this.path.fill(null);
        this.passedPot.fill(false);
        this.noFullPath = true;
    }

    checkPathCompleteness() {
        const activeCells = this.passedPot.filter(passed => passed).length;
        const totalActiveCells = this.row * this.column - this.notExistPotList.length;
        console.log('Active cells:', activeCells, 'Total active cells:', totalActiveCells);
        return activeCells === totalActiveCells;
    }
}
// // 创建实例并测试
// const gridPathFinder = new GridPathFinder(5, 5, [18, 12, 15, 19, 20, 2, 10, 17]);
// console.log("Is one stroke? (5x5 with holes)", gridPathFinder.isOneStroke(true));

// const gridPathFinder1 = new GridPathFinder(3, 3, []);
// console.log("Is one stroke? (3x3 full)", gridPathFinder1.isOneStroke(true));
// const gridPathFinder6 = new GridPathFinder(6, 6, []);
// console.log("Is one stroke? (3x3 full)", gridPathFinder6.isOneStroke(true));
// const gridPathFinder2 = new GridPathFinder(3, 3, [1, 3, 5, 7]);
// console.log("Is one stroke? (3x3 with holes)", gridPathFinder2.isOneStroke(true));

// const gridPathFinder3 = new GridPathFinder(3, 3, [1, 2, 5]);
// console.log("Is one stroke? (3x3 disconnected)", gridPathFinder3.isOneStroke(true));