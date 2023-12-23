import { utilities } from "./utilities.js";

let totalVisitedCell = 0, havePath = false;

async function recursiveDFS(curCell, startCell, endCell, boardRows, boardColumns, boardArray, boardReference, parent) {
    totalVisitedCell++;
    let [i, j] = curCell;

    if (utilities.isEqual(curCell, endCell)) {
        havePath = true; return;
    }
    if (!utilities.isEqual(curCell, startCell)) {
        boardReference[i][j].classList.add('lead');
        await utilities.goingPathColor(boardReference[i][j]);
    }

    boardArray[i][j] = -1;
    let moves = [[-1, 0], [0, 1], [1, 0], [0, -1]];

    for (let k = 0; k < 4; k++) {
        let a = moves[k][0] + i;
        let b = moves[k][1] + j;

        if (utilities.isValid(a, b, boardRows, boardColumns, boardArray) && !havePath) {
            await recursiveDFS([a, b], startCell, endCell, boardRows, boardColumns, boardArray, boardReference, parent);
            parent[a][b] = [i, j];
        }
    }
}

async function findPath(startCell, endCell, boardRows, boardColumns, board, boardReference, description) {
    let boardArray = board.map(inner => [...inner]);
    totalVisitedCell = 0;
    havePath = false;
    let parent = utilities.getBlankParent(boardRows, boardColumns);

    await recursiveDFS(startCell, startCell, endCell, boardRows, boardColumns, boardArray, boardReference, parent);

    if (havePath) {
        let ans = [], cur = endCell;
        while (!utilities.isEqual(cur, startCell)) {
            ans.unshift(cur);
            cur = parent[cur[0]][cur[1]];
        }
        let totalPathLength = ans.length;
        ans.pop();

        while (ans.length > 0) {
            let [i, j] = ans.shift();
            await utilities.foundedPathColor(boardReference[i][j]);
        }
        description.innerHTML = `Depth-First Search <b>visited ${totalVisitedCell - 1}</b> cells and total <b>path length is ${totalPathLength}.</b>`;
    }
    else description.innerHTML = `Depth-First Search <b>visited ${totalVisitedCell - 1}</b> cells and <b>no path found.</b>`;
}

export const dfs = { findPath }