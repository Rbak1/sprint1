'use strict'
const BEGIN = 4;
const MED = 8;
const EXPT = 12;
const MINE = '💣';
const FLAG = '🚩';
const MINEBEGIN = 2;
const MINEMED = 12;
const MINEEXPT = 30;

var gBoard;
var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gGame = {
    isOn: true,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};





function initGame() {
    buildBoard();
    placeMine();
    cellMineCount(MINE);
    renderBoard();
};




function buildBoard() {
    gBoard = [];
    // var mines = setMines();
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            gBoard[i][j] = {

                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true,
                contains: ''
            }
        }

    }
}


function renderBoard() {
    var elGameBoard = document.querySelector('tbody');
    var strHtml = '';
    for (var i = 0; i < 4; i++) {
        strHtml += '<tr>'
        var className = i;
        for (var j = 0; j < 4; j++) {
            var cell = gBoard[i][j];
            strHtml += `<td data-cords="${i}-${j}" onclick= "cellClicked(this,${i}, ${j})" oncontextmenu = "cellRightClicked(this,${i}, ${j})"><span class = "contains" data-show="${i}-${j}">${gBoard[i][j].contains}</span><span data-flag="${i}-${j}"></span></td>`
        }
        strHtml += '</tr>'
    }
    elGameBoard.innerHTML = strHtml;
};



function cellClicked(elCell, indxI, indxJ) {
    if (gGame.isOn) {
        checkGameOver(elCell);
    }
    if (elCell.innerText >= 1) {
        var cellidx = document.querySelector(`[data-show="${indxI}-${indxJ}"]`);
        cellidx.style.fontSize = "20px";
        elCell.style.backgroundColor = "blue";

    }
}


function cellRightClicked(elClicked, i, j) {
    var elcell = document.querySelector(`[data-flag="${i}-${j}"]`);
    if (elcell.innerText !== FLAG) {
        elcell.innerText = FLAG;
    } else {
        elcell.innerText = '';
    }
}




function checkGameOver(elcell) {
    if (elcell.innerText === MINE) {
        var showAll = document.getElementsByClassName(`contains`);
        for (var i = 0; i < showAll.length; i++) {
            showAll[i].style.fontSize = '25px'
        }
        gGame.isOn = false;
        setTimeout(function () { alert('You lost, Better luck next time'); }, 500);
    }

}



function getRandomInt() {
    return Math.floor(Math.random() * (3 + 1));
};




function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine === true) neighborsSum++;
        }
    }
    return neighborsSum;
}

function cellMineCount(string) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].contains !== string) {
                var setNum = countNeighbors(i, j, gBoard);
                gBoard[i][j].contains = setNum;
            }
        }
    }
}



function getEmptySpaces() {
    var emptySpaces = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].contains === '') {
                emptySpaces.push({ i: i, j: j });
            }
        }
    }
    return emptySpaces;
}

function placeMine() {
    var isMines = getEmptySpaces()
    for (var i = 0; i < 2; i++) {
        var iIndx = getRandomInt();
        gBoard[isMines[iIndx].i][isMines[iIndx].j].isMine = true;
        gBoard[isMines[iIndx].i][isMines[iIndx].j].contains = MINE;
        isMines.splice(iIndx, 1);

    }
}

function renderCell(elCell, value) {
    elCell.innerText = value
}
