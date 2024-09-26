export class GridPathFinder {
    constructor(row, column, notExistPotList) {
        this.noFullPath = true;
        this.column = column;
        this.row = row;
        this.notExistPotList = notExistPotList;
        this.passedPot = new Array(row * column).fill(false);
        this.path = new Array(row * column - notExistPotList.length);
    }

    decideSingleBounds(bounds, singleBounds) {
        return (bounds & singleBounds) !== 0;
    }

    setPassedPotAndPath(p, a, b) {
        this.path[p] = a;
        this.setPassedPot(a, b);
    }

    setPassedPotAndPath(a) {
        this.setPassedPotAndPath(0, a, true);
    }

    decideBounds(pot) {
        let count = 0;
        if (pot < this.column) count += 1;
        if ((pot - (this.row - 1) * this.column) >= 0 && (pot - (this.row - 1) * this.column) < this.column) count += 2;
        if (pot % this.column === 0) count += 4;
        if (pot % this.column === this.column - 1) return count += 8;
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
        for (let i = 0; i < this.notExistPotList.length; i++) {
            if (pot === this.notExistPotList[i]) return true;
        }
        return false;
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
}