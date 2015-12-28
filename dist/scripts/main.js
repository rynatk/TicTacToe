//Tic-Tac-Toe Game Logic
//Coded by Ryan Atkinson

$(document).ready(function () {

  var Xturn = true;
  var Oturn = false;
  var Xs = [];
  var Os = [];
  var checkWin = 0;
  var killSwitch = false;

  // Represents the current state of the Gameboard.
  // "X" == 1; "O" == 2;
  var gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Array containing all conditions repsenting a win for player X.
  // 3 used as a placeholder to ignore other board positions when comparing.
  var xWinConditions = [ [1, 1, 1, 3, 3, 3, 3, 3, 3],
                         [1, 3, 3, 1, 3, 3, 1, 3, 3],
                         [3, 3, 3, 3, 3, 3, 1, 1, 1],
                         [3, 3, 1, 3, 3, 1, 3, 3, 1],
                         [3, 1, 3, 3, 1, 3, 3, 1, 3],
                         [3, 3, 3, 1, 1, 1, 3, 3, 3],
                         [1, 3, 3, 3, 1, 3, 3, 3, 1],
                         [3, 3, 1, 3, 1, 3, 1, 3, 3], ];

  // Array containing all conditions representing a win for player O.
  // 3 used as a placeholder to ignore other board positions when comparing.
  var oWinConditions = [ [2, 2, 2, 3, 3, 3, 3, 3, 3],
                         [2, 3, 3, 2, 3, 3, 2, 3, 3],
                         [3, 3, 3, 3, 3, 3, 2, 2, 2],
                         [3, 3, 2, 3, 3, 2, 3, 3, 2],
                         [3, 2, 3, 3, 2, 3, 3, 2, 3],
                         [3, 3, 3, 2, 2, 2, 3, 3, 3],
                         [2, 3, 3, 3, 2, 3, 3, 3, 2],
                         [3, 3, 2, 3, 2, 3, 2, 3, 3], ];

  // Function to read over the current state of the board between moves, and determine if there is a win condition.
  var winScan = function () {
    if(Xturn) {
      for(i=0; i<xWinConditions.length; i++) {
        checkWin = 0;
        for(j=0; j<gameBoard.length; j++) {
          if((xWinConditions[i][j])===gameBoard[j]) {
            checkWin += 1;
          }
          if(checkWin > 2) {
            console.log('X WINS!');
            $('.winnerStatement1').addClass('anchorlight');
            killSwitch = true;
          } else {
          }
        }
      }
    } else if(Oturn) {
      for(i=0; i<oWinConditions.length; i++) {
        checkWin = 0;
        for(j=0; j<gameBoard.length; j++) {
          if((oWinConditions[i][j])===gameBoard[j]) {
            checkWin += 1;
          }
          if(checkWin > 2) {
            console.log('O WINS!');
            $('.winnerStatement2').addClass('lifesaverlight');
            killSwitch = true;
          } else {
          }
        }
      }
    }
  };

  var tieScan = function () {
    if(!killSwitch && (gameBoard.indexOf(0)===-1)){
      $('.tieGameStatement').addClass('tielight');
    }
  }

  $('.block').click(function () {
    if(!killSwitch){
      if(gameBoard[$(this).data('position')] < 1) {
        if(Xturn) {
          $(this).addClass('flippedX').removeClass('flippedO');
          gameBoard[$(this).data('position')] = 1;
          winScan();
          tieScan();
          Xturn = false;
          Oturn = true;
          console.log(gameBoard);
        } else {
          $(this).addClass('flippedO').removeClass('flippedX');
          gameBoard[$(this).data('position')] = 2;
          winScan();
          tieScan();
          Xturn = true;
          Oturn = false;
          console.log(gameBoard);
        }
      } else if(gameBoard[$(this).data('position')] > 0) {
        $('.invalidMove').addClass('invalidlight');
        setTimeout(function() {
          $('.invalidMove').removeClass('invalidlight');
        }, 500);
      }
    }
  });
});
