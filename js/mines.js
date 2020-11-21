'use strict'


function placeMine() {

    for (var i = 0; i < gLevel.MINES; i++) {
        var iIndx = getRandomInt();
        var jIndx = getRandomInt();
        if (gBoard[iIndx][jIndx].contains === '') {
            gBoard[iIndx][jIndx].isMine = true;
            gBoard[iIndx][jIndx].contains = MINE;
        } else {
            i--
        }
    }
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
