'use strict'
const BEGIN = 4;
const MED = 8;
const EXPT = 12;
const MINE = '💣';
const FLAG = '🚩';
const MINEBEGIN = 2;
const MINEMED = 12;
const MINEEXPT = 30;

var firstclick = 0;

var gBoard;
var FlagedMineLeft = 0;
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

var lives = 3;

function renderLevel(diff, mines) {
    gLevel.SIZE = diff;
    gLevel.MINES = mines;
    initGame();
}

function initGame() {
    emoji.innerText = '😃'
    lives = 3;
    lifeTrack();
    gGame.isOn = true;
    stopTime();
    buildBoard(gLevel.SIZE);
    placeMine(gLevel.MINES);
    cellMineCount(MINE);
    renderBoard();
    firstclick = 0;
    FlagedMineLeft = gLevel.MINES;
};




function buildBoard(diff) {
    gBoard = [];
    for (var i = 0; i < diff; i++) {
        gBoard.push([])
        for (var j = 0; j < diff; j++) {
            gBoard[i][j] = {

                isShown: false,
                isMine: false,
                isMarked: false,
                contains: ''
            }
        }
    }
}


function renderBoard() {
    var elGameBoard = document.querySelector('tbody');
    var strHtml = '';
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += '<tr>'
        var className = i;
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = gBoard[i][j];
            strHtml += `<td data-cords="${i}-${j}" onclick= "cellClicked(this,${i}, ${j})" oncontextmenu = "cellRightClicked(this,${i}, ${j})"><span class = "contains" data-show="${i}-${j}">${gBoard[i][j].contains}</span><span data-flag="${i}-${j}"></span></td>`
        }
        strHtml += '</tr>'
    }
    elGameBoard.innerHTML = strHtml;
};


function cellClicked(elCell, indxI, indxJ) {
    var cellidx = document.querySelector(`[data-show="${indxI}-${indxJ}"]`);
    if (firstclick === 0) {
        stopWatchStart();
    }
    if (gGame.isOn && !gBoard[indxI][indxJ].isMarked) {
        firstclick++
        checkGameOver(elCell);
        if (elCell.innerText >= 1) {
            cellidx.style.fontSize = "20px";
            elCell.style.backgroundColor = "blue";
            gBoard[indxI][indxJ].isShown = true;
            checkWin();

        } else if(elCell.innerText === 0) {
            cellidx.style.fontSize = "20px";
            elCell.style.backgroundColor = "green";
            gBoard[indxI][indxJ].isShown = true;
        };


        //this part handdle the neighbors of the clicked cell

        if (elCell.innerText < 1) {
            for (var i = indxI - 1; i <= indxI + 1; i++) {
                for (var j = indxJ - 1; j <= indxJ + 1; j++) {
                    if (i < 0 || j < 0) continue;
                    var cellidx = document.querySelector(`[data-show="${i}-${j}"]`);
                    var cellidxb = document.querySelector(`[data-cords="${i}-${j}"]`)
                    if (cellidxb.innerText >= 1) {
                        cellidxb.style.backgroundColor = "blue";
                    } else {
                        cellidxb.style.backgroundColor = "green";
                    }
                    cellidx.style.fontSize = "20px";
                    gBoard[i][j].isShown = true;
                    checkWin();
                }
            }
        }
    }
}


function cellRightClicked(elClicked, i, j) {
    if (firstclick === 0) {
        stopWatchStart();
        firstclick++
    }
    if (gGame.isOn === true) {
        if (!gBoard[i][j].isShown) {
            var elcell = document.querySelector(`[data-flag="${i}-${j}"]`);
            if (elcell.innerText !== FLAG) {
                if (gBoard[i][j].isMine) {
                    FlagedMineLeft--;
                }
                elcell.innerText = FLAG;
                gBoard[i][j].isMarked = true;
                checkWin();
            } else {
                elcell.innerText = '';
                gBoard[i][j].isMarked = false;
                if (gBoard[i][j].isMine) {
                    FlagedMineLeft++;
                }
            }
        }
    }
}



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



function checkWin() {
    if (getNoMinesCells() === 0 && FlagedMineLeft === 0) {
        emoji.innerText = '😎';
        stopTime()
        alert('YOU WON!');
        gGame.isOn = false;
        var restart = document.getElementById('restart');
        restart.style.visibility = "visible";

    }
}


function checkGameOver(elcell) {
    if (elcell.innerText === MINE) {
        lives--
        lifeTrack();
        if (lives < 0) {
            emoji.innerText = '😷';
            stopTime();
            var showAll = document.getElementsByClassName(`contains`);
            for (var i = 0; i < showAll.length; i++) {
                if (showAll[i].innerText === MINE) {
                    showAll[i].style.fontSize = '20px'
                }
            }
            gGame.isOn = false;
            setTimeout(function () { alert('You lost, Better luck next time'); }, 500);
            var restart = document.getElementById('restart');
            restart.style.visibility = "visible";
        }
    }

}
