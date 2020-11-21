'use strict'

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

var emoji = document.querySelector(".emoji")
emoji.innerText = '😃';
var life = document.querySelector(".lives");

function lifeTrack() {
    life.innerHTML = ""
    for (var i = 0; i < lives; i++) {
        life.innerHTML += '❤️'
    }
}



function getRandomInt(max) {
    return Math.floor(Math.random() * (gLevel.SIZE));
};


function getNoMinesCells() {
    var noneMineSpaces = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].contains !== MINE && !gBoard[i][j].isShown) {
                noneMineSpaces.push({ i: i, j: j });
            }
        }
    }
    return noneMineSpaces.length;
}

// // Stopwatch
var TimeOnPage = document.querySelector('.stopWatch');
var Stopwatch = 0;
function stopTime() {
    clearInterval(Stopwatch);
}

stopWatchStart()
function stopWatchStart() {
    var startTime = Date.now();
    Stopwatch = setInterval(function () {
        var elapsedTime = Date.now() - startTime;
        document.querySelector('.stopWatch').innerHTML = (elapsedTime / 1025).toFixed(
            2
        );
    }, 1000);
}

