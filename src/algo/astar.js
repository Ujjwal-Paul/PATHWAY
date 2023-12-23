import { utilities } from "./utilities.js";

function heuristic(start, end) {
    return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

async function findPath(startCell, endCell, boardRows, boardColumns, board, boardReference, description) {
    let boardArray = board.map(inner => [...inner]);
    let totalVisitedCell = 0, totalPathLength = 0, havePath = false;
    let parent = utilities.getBlankParent(boardRows, boardColumns), actualDist = [];

    for (let i = 0; i < boardRows; i++) {
        let dist = [];
        for (let j = 0; j < boardColumns; j++) dist.push(-1);
        actualDist.push(dist);
    }

    let pq = new utilities.PriorityQueue();
    let [i, j] = startCell, curFn = heuristic(startCell, endCell);
    pq.push([curFn, i, j]);
    actualDist[i][j] = 0;

    while (!pq.empty()) {
        [curFn, i, j] = pq.pop();
        let gn = actualDist[i][j];
        boardArray[i][j] = -1;
        totalVisitedCell++;

        if (utilities.isEqual([i, j], endCell)) {
            havePath = true; break;
        }
        if (!utilities.isEqual([i, j], startCell)) {
            boardReference[i][j].classList.add('lead');
            await utilities.goingPathColor(boardReference[i][j]);
        }

        let moves = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        for (let k = 0; k < 4; k++) {
            let a = moves[k][0] + i;
            let b = moves[k][1] + j;

            if (utilities.isValid(a, b, boardRows, boardColumns, boardArray)) {
                let hn = heuristic([a, b], endCell);
                let fn = hn + gn + 1;

                if (utilities.isEqual(parent[a][b], [-1, -1]) || fn <= curFn) {
                    pq.push([fn, a, b]);
                    actualDist[a][b] = gn + 1;
                    parent[a][b] = [i, j];
                }
            }
        }
    }

    if (havePath) {
        let ans = [], cur = endCell;
        while (!utilities.isEqual(cur, startCell)) {
            ans.unshift(cur);
            cur = parent[cur[0]][cur[1]];
        }
        totalPathLength = ans.length;
        ans.pop();

        while (ans.length > 0) {
            [i, j] = ans.shift();
            await utilities.foundedPathColor(boardReference[i][j]);
        }
        description.innerHTML = `A* Search <b>visited ${totalVisitedCell - 1}</b> cells and total <b>path length is ${totalPathLength}.</b>`;
    }
    else description.innerHTML = `A* Search <b>visited ${totalVisitedCell - 1}</b> cells and <b>no path found.</b>`;
}

export const astar = { findPath }