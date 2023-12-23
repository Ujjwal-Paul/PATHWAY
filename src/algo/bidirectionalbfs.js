import { utilities } from "./utilities.js";

async function findPath(startCell, endCell, boardRows, boardColumns, board, boardReference, description) {
    let boardArray = board.map(inner => [...inner]);
    let startQue = [], endQue = [], parent = utilities.getBlankParent(boardRows, boardColumns);
    let totalVisitedCell = 0, totalPathLength = 0, havePath = false;
    let targetStart = [], targetEnd = [];

    startQue.push(startCell);
    endQue.push(endCell);
    let [i, j] = startCell;
    let [x, y] = endCell;

    boardArray[i][j] = 4; // cell added into start path
    boardArray[x][y] = 5; // cell added into end path

    while (startQue.length > 0 && endQue.length > 0 && !havePath) {
        [i, j] = startQue.shift();

        if (!utilities.isEqual([i, j], startCell)) {
            totalVisitedCell++;
            boardReference[i][j].classList.add('lead');
            await utilities.goingPathColor(boardReference[i][j]);
        }
        boardArray[i][j] = 2; // start path cell visited

        let moves = [[-1, 0], [0, 1], [1, 0], [0, -1]];

        for (let k = 0; k < 4; k++) {
            let a = moves[k][0] + i;
            let b = moves[k][1] + j;

            if (utilities.isValid(a, b, boardRows, boardColumns, boardArray)) {
                if (boardArray[a][b] == 3) {
                    havePath = true;
                    targetStart = [i, j];
                    targetEnd = [a, b];
                    break;
                }
                if (boardArray[a][b] != 2 && boardArray[a][b] != 4 && boardArray[a][b] != 5) {
                    startQue.push([a, b]);
                    boardArray[a][b] = 4;
                    parent[a][b] = [i, j];
                }
            }
        }

        if (havePath) break;
        [x, y] = endQue.shift();

        if (!utilities.isEqual([x, y], endCell)) {
            totalVisitedCell++;
            boardReference[x][y].classList.add('lead');
            await utilities.goingPathColor(boardReference[x][y]);
        }
        boardArray[x][y] = 3; // end path cell visited

        for (let k = 0; k < 4; k++) {
            let a = moves[k][0] + x;
            let b = moves[k][1] + y;

            if (utilities.isValid(a, b, boardRows, boardColumns, boardArray)) {
                if (boardArray[a][b] == 2) {
                    havePath = true;
                    targetStart = [a, b];
                    targetEnd = [x, y];
                    break;
                }
                if (boardArray[a][b] != 3 && boardArray[a][b] != 4 && boardArray[a][b] != 5) {
                    endQue.push([a, b]);
                    boardArray[a][b] = 5;
                    parent[a][b] = [x, y];
                }
            }
        }
    }

    if (havePath) {
        let ans = [];
        while (!utilities.isEqual(targetStart, startCell)) {
            ans.unshift(targetStart);
            targetStart = parent[targetStart[0]][targetStart[1]];
        }
        while (!utilities.isEqual(targetEnd, endCell)) {
            ans.push(targetEnd);
            targetEnd = parent[targetEnd[0]][targetEnd[1]];
        }
        totalPathLength = ans.length + 1;
        totalVisitedCell++;

        while (ans.length > 0) {
            [i, j] = ans.shift();
            await utilities.foundedPathColor(boardReference[i][j]);
        }
        description.innerHTML = `Bidirectional BFS Search <b>visited ${totalVisitedCell}</b> cells and total <b>path length is ${totalPathLength}.</b>`;
    }
    else description.innerHTML = `Bidirectional BFS Search <b>visited ${totalVisitedCell}</b> cells and <b>no path found.</b>`;
}

export const bidirectionalbfs = { findPath }