export class GridPathFinder {
    constructor(row, column, notExistPotList) {
        this.row = row;
        this.column = column;
        this.notExistPotList = notExistPotList || [];
        this.passedPot = new Array(row * column).fill(false);
        this.path = new Array(row * column - notExistPotList.length);
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

    isOneStroke() {
        const degree = new Array(this.row * this.column).fill(0);
        const visited = new Array(this.row * this.column).fill(false);

        // Helper function to get valid neighbors
        const getNeighbors = (i) => {
            const neighbors = [];
            if (i % this.column > 0 && !this.notExistPot(i - 1)) neighbors.push(i - 1);
            if (i % this.column < this.column - 1 && !this.notExistPot(i + 1)) neighbors.push(i + 1);
            if (i >= this.column && !this.notExistPot(i - this.column)) neighbors.push(i - this.column);
            if (i < (this.row - 1) * this.column && !this.notExistPot(i + this.column)) neighbors.push(i + this.column);
            return neighbors;
        };

        // DFS to check connectivity and calculate degrees
        const dfs = (i) => {
            if (visited[i]) return;
            visited[i] = true;
            const neighbors = getNeighbors(i);
            degree[i] = neighbors.length;
            neighbors.forEach(neighbor => dfs(neighbor));
        };

        // Find the first valid cell to start DFS
        let startCell = null;
        for (let i = 0; i < this.row * this.column; i++) {
            if (!this.notExistPot(i)) {
                startCell = i;
                break;
            }
        }

        if (startCell === null) return false; // No valid cells

        dfs(startCell);

        // Check if all valid cells are connected
        for (let i = 0; i < this.row * this.column; i++) {
            if (!this.notExistPot(i) && !visited[i]) return false; // Not all valid cells are connected
        }

        const oddDegreeCount = degree.filter(d => d % 2 !== 0).length;
        return oddDegreeCount <= 2;
    }
}