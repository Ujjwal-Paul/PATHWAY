import { utilities } from "./utilities.js";

async function findPath(startCell, endCell, boardRows, boardColumns, board, boardReference, description) {
    let boardArray = board.map(inner => [...inner]);
    let havePath = false, totalVisitedCell = 0, totalPathLength = 0;
    let que = [], parent = utilities.getBlankParent(boardRows, boardColumns);

    que.push(startCell);
    let [i, j] = startCell;
    boardArray[i][j] = -1;

    while (que.length > 0) {
        [i, j] = que.shift();
        if (utilities.isEqual([i, j], endCell)) {
            havePath = true;
            totalVisitedCell++; break;
        }
        if (!utilities.isEqual([i, j], startCell)) {
            boardReference[i][j].classList.add('lead');
            await utilities.goingPathColor(boardReference[i][j]);
            totalVisitedCell++;
        }

        let moves = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        for (let k = 0; k < 4; k++) {
            let a = moves[k][0] + i;
            let b = moves[k][1] + j;

            if (utilities.isValid(a, b, boardRows, boardColumns, boardArray)) {
                que.push([a, b]);
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
        description.innerHTML = `Breath-First Search <b>visited ${totalVisitedCell}</b> cells and total <b>path length is ${totalPathLength}.</b>`;
    }
    else description.innerHTML = `Breath-First Search <b>visited ${totalVisitedCell}</b> cells and <b>no path found.</b>`;
}

export const bfs = { findPath }