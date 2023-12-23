let goingTimeDelay = 20, foundedTimeDelay = 40;

class PriorityQueue {
    arr = []
    push(el) {
        if (this.empty()) {
            this.arr.push(el);
        } else {
            let flag = true;
            for (let i = 0; i < this.arr.length; i++) {
                if (this.arr[i][0] >= el[0]) {
                    this.arr.splice(i, 0, el);
                    flag = false; break;
                }
            }
            if (flag) {
                this.arr.push(el);
            }
        }
    }
    pop() { return this.arr.shift(); }
    empty() { return this.arr.length == 0; }
}

function setSpeed(speed) {
    switch (speed) {
        case 1: goingTimeDelay = 20; break;
        case 2: goingTimeDelay = 100; break;
        case 3: goingTimeDelay = 500; break;
    }
}

function getBlankParent(rows, columns) {
    let parent = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) row.push([-1, -1]);
        parent.push(row);
    }
    return parent;
}

function isValid(i, j, row, column, array) {
    return (i >= 0 && i < row) && (j >= 0 && j < column) && array[i][j] != -1;
}

function isEqual(arr1, arr2) {
    return (arr1[0] == arr2[0] && arr1[1] == arr2[1]);
}

function goingPathColor(element) {
    return new Promise((resolve) => {
        setTimeout(() => {
            element.classList.remove('lead');
            element.classList.add('go');
            resolve();
        }, goingTimeDelay);
    })
}

function foundedPathColor(element) {
    return new Promise((resolve) => {
        setTimeout(() => {
            element.classList.remove('go');
            element.classList.add('found');
            resolve();
        }, foundedTimeDelay);
    })
}

export const utilities = {
    PriorityQueue, setSpeed, getBlankParent, isValid, isEqual, goingPathColor, foundedPathColor,
}