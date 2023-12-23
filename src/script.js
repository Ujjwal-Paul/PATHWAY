import { bfs } from "./algo/bfs.js";
import { dfs } from "./algo/dfs.js";
import { astar } from "./algo/astar.js";
import { bestfirst } from "./algo/bestfirst.js";
import { bidirectionalbfs } from "./algo/bidirectionalbfs.js";
import { utilities } from "./algo/utilities.js";

const logo = document.querySelector('.logo'),
    algo = document.querySelector('.algo'),
    run = document.querySelector('.run'),
    options = algo.querySelector('.options'),
    choice = options.querySelectorAll('p'),
    speed = document.querySelector('.speed'),
    speedOptions = speed.querySelector('.speed-options'),
    speedChoice = speedOptions.querySelectorAll('p'),
    allButtons = document.querySelector('.actions').querySelectorAll('.btn'),
    description = document.querySelector('.description'),
    board = document.querySelector('.board'),
    table = board.querySelector('table');


algo.addEventListener('click', () => {
    !running && options.classList.contains('hide') ? options.classList.remove('hide') : options.classList.add('hide');
})

speed.addEventListener('click', () => {
    !running && speedOptions.classList.contains('hide') ? speedOptions.classList.remove('hide') : speedOptions.classList.add('hide');
})

document.addEventListener('click', (e) => {
    e.target.classList.contains('algo') || options.classList.add('hide');
    e.target.classList.contains('speed') || speedOptions.classList.add('hide');
})

choice.forEach(e => {
    e.addEventListener('click', () => {
        choice.forEach(c => c.classList.remove('clicked'))
        e.classList.add('clicked');
        showMessage(e.getAttribute('type'));
    })
})

speedChoice.forEach(e => {
    e.addEventListener('click', () => {
        speedChoice.forEach(c => c.classList.remove('clicked'))
        e.classList.add('clicked');
    })
})

logo.querySelector('a').addEventListener('mouseenter', () => {
    logo.querySelector('img').style.animation = "none";
    setTimeout(() => logo.querySelector('img').style.animation = "jump-animation .5s linear", 1)
})

const allMessages = {
    'defaultMessage': 'Put start and end, pick an algorithm and start visualize it!',
    'algoNotFound': 'Please pick an algorithm first!!',
    'startNotFound': 'Please select a start cell first!!',
    'endNotFound': 'Please select an end cell first!!',
    1: 'Breath-First Search is <b>unweighted</b> and <b>guarantees</b> the shortest path!',
    2: 'Depth-First Search is <b>unweighted</b> and <b>does not guarantee</b> the shortest path!',
    3: 'A* Search is <b>weighted</b> and <b>guarantees</b> the shortest path!',
    4: 'Best-First Search is <b>weighted</b> and <b>does not guarantee</b> the shortest path!',
    5: 'Bidirectional BFS Algorithm is <b>unweighted</b> and <b>guarantees</b> the shortest path!',
}

function showMessage(message) {
    description.style.animation = ''
    message.includes('NotFound') ? (
        description.innerHTML = `<b>${allMessages[message]}</b>`,
        description.style.color = '#e01e37',
        setTimeout(() => description.style.animation = 'alert-animation .7s linear 7 alternate', 1)
    ) : (
        description.innerHTML = allMessages[message],
        description.style.color = '#000'
    )
}

let boardRows = 0, boardColumns = 0,
    boardArray = [], boardReference = [],
    startCell = null, endCell = null,
    running = false, mousedown = false, button = 3;

function boardResizer() {
    showMessage('defaultMessage');
    let upper = document.querySelector('nav').clientHeight;
    upper += description.clientHeight;
    boardRows = parseInt((window.innerHeight - upper) / 25);
    boardColumns = parseInt(window.innerWidth / 25);
    fillTable();
}
boardResizer();

window.addEventListener('resize', boardResizer)

function fillTable() {
    table.innerHTML = '';
    boardArray = [];
    boardReference = [];
    startCell = null;
    endCell = null;
    button = 3;
    for (let i = 0; i < boardRows; i++) {
        boardArray[i] = [];
        boardReference[i] = [];
        let newTr = document.createElement('tr');
        for (let j = 0; j < boardColumns; j++) {
            let newTd = document.createElement('td');
            newTd.setAttribute('i', `${i}`);
            newTd.setAttribute('j', `${j}`);
            newTr.append(newTd);
            boardArray[i][j] = 0;
            boardReference[i][j] = newTd;
        }
        table.append(newTr);
    }
}

function getIndex(element) {
    return [
        Number(element.getAttribute('i')),
        Number(element.getAttribute('j')),
    ];
}

allButtons.forEach(e => {
    e.addEventListener('click', () => {
        button = Number(e.getAttribute('type'));
        if (!running && button == 5) fillTable();
        if (!running && button == 7) startVisualize();
    })
})

document.addEventListener('mousedown', (e) => {
    mousedown = true;
    if (e.target.tagName == 'TD' && !running) {
        let [i, j] = getIndex(e.target);
        switch (button) {
            case 1: if (boardArray[i][j] == 2) break;
                if (startCell) {
                    let [a, b] = startCell;
                    boardArray[a][b] = 0;
                    boardReference[a][b].classList.remove('st');
                }
                e.target.classList.remove('rock');
                e.target.classList.remove('go');
                e.target.classList.remove('found');
                boardArray[i][j] = 1;
                startCell = [i, j];
                e.target.classList.add('st'); break;

            case 2: if (boardArray[i][j] == 1) break;
                if (endCell) {
                    let [a, b] = endCell;
                    boardArray[a][b] = 0;
                    boardReference[a][b].classList.remove('end');
                }
                e.target.classList.remove('rock');
                e.target.classList.remove('go');
                e.target.classList.remove('found');
                boardArray[i][j] = 2;
                endCell = [i, j];
                e.target.classList.add('end'); break;

            case 3: if (boardArray[i][j] <= 0) {
                e.target.classList.remove('rock');
                e.target.classList.remove('go');
                e.target.classList.remove('found');
                setTimeout(() => { e.target.classList.add('rock'); }, 1)
                boardArray[i][j] = -1; break;
            }
        }
    }
});

document.addEventListener('mouseup', () => mousedown = false);

document.addEventListener('mousemove', (e) => {
    if (mousedown && button == 3 && e.target.tagName == 'TD' && !running) {
        let [i, j] = getIndex(e.target);
        if (boardArray[i][j] <= 0) {
            e.target.classList.remove('rock');
            e.target.classList.remove('go');
            e.target.classList.remove('found');
            setTimeout(() => { e.target.classList.add('rock'); }, 1)
            boardArray[i][j] = -1;
        }
    }
});

async function startVisualize() {
    let type = 0;
    choice.forEach(e => {
        if (e.classList.contains('clicked'))
            type = Number(e.getAttribute('type'));
    })

    if (type == 0) showMessage('algoNotFound');
    else if (!startCell) showMessage('startNotFound');
    else if (!endCell) showMessage('endNotFound');

    if (type > 0 && startCell && endCell) {
        running = true;
        run.style.background = '#e01e37';
        run.innerHTML = 'Running...';
        showMessage(`${type}`);

        // cleaning previous board for the next round visualize
        for (let i = 0; i < boardRows; i++) {
            for (let j = 0; j < boardColumns; j++) {
                if (boardArray[i][j] == 0) {
                    boardReference[i][j].classList.remove('go');
                    boardReference[i][j].classList.remove('found');
                }
            }
        }

        // setting speed of the visualizer
        let speedType = 1;
        speedChoice.forEach(e => {
            if (e.classList.contains('clicked'))
                speedType = Number(e.getAttribute('type'));
        })
        utilities.setSpeed(speedType);

        switch (type) {
            case 1: await bfs.findPath(startCell, endCell, boardRows, boardColumns, boardArray, boardReference, description); break;
            case 2: await dfs.findPath(startCell, endCell, boardRows, boardColumns, boardArray, boardReference, description); break;
            case 3: await astar.findPath(startCell, endCell, boardRows, boardColumns, boardArray, boardReference, description); break;
            case 4: await bestfirst.findPath(startCell, endCell, boardRows, boardColumns, boardArray, boardReference, description); break;
            case 5: await bidirectionalbfs.findPath(startCell, endCell, boardRows, boardColumns, boardArray, boardReference, description); break;
        }
    }

    if (running) {
        running = false;
        run.innerHTML = 'Visualize!';
        allButtons.forEach(e => e.style.background = '#46c2a9');
    }
}

allButtons.forEach(e => {
    e.addEventListener('mouseenter', () => running ? e.style.background = '#e01e37' : '')
    e.addEventListener('mouseout', () => e.classList.contains('run') ? '' : e.style.background = '#46c2a9')
})