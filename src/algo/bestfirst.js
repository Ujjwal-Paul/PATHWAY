import { utilities } from "./utilities.js";

function heuristic(start, end) {
    return Math.abs(start[0] - end[0]) + Math.abs(start[1] - end[1]);
}

async function findPath(startCell, endCell, boardRows, boardColumns, board, boardReference, description) {
    let boardArray = board.map(inner => [...inner]);
    let totalVisitedCell = 0, totalPathLength = 0, havePath = false;
    let parent = utilities.getBlankParent(boardRows, boardColumns);

    let pq = new utilities.PriorityQueue();
    let [i, j] = startCell, curHn = heuristic(startCell, endCell);
    pq.push([curHn, i, j]);
    boardArray[i][j] = -1;

    while (!pq.empty()) {
        [curHn, i, j] = pq.pop();
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
                pq.push([hn, a, b]);
                boardArray[a][b] = -1;
                parent[a][b] = [i, j];
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
        description.innerHTML = `Best-First Search <b>visited ${totalVisitedCell - 1}</b> cells and total <b>path length is ${totalPathLength}.</b>`;
    }
    else description.innerHTML = `Best-First Search <b>visited ${totalVisitedCell - 1}</b> cells and <b>no path found.</b>`;
}

export const bestfirst = { findPath }