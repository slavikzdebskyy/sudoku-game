'use strict';


// const TurnsRegistrator = require('./turns_registrator.js');
// const BoardArray = require('./work_array.js');
// const Check = require('./js/checking');
// const Board = require('./board.js');
// const Timer = require('./timer.js');
// const Marking = require('./marking.js');
// const shemeArray = require('./sheme_array.js');
 




import TurnsRegistrator from './js/turns_registrator.js';
import BoardArray from './js/board_array.js';
import Check from './js/checking.js';
import Board from './js/board.js';
import Timer from './js/timer.js';
import Marking from './js/marking.js';
import { shemeArray } from './js/sheme_array.js';

const $boardContainer = document.getElementById('board-container');
const $modalWindow = document.getElementById('modal-check-window');
const $difficultyContainer = document.getElementById('difficulty');
const $undoOrRedoBtnsContainer = document.getElementById('undo-redo-container');
const $cells = $boardContainer.getElementsByClassName('cell');

const $checkBtn = document.getElementById('check-btn'); 
const $newGameBtn = document.getElementById('new-game-btn');
const $restartBtn = document.getElementById('restart-btn'); 

const $timerSpan = document.getElementById('timer');

const turnsRegistrator = new TurnsRegistrator($boardContainer);
const timer = new Timer();
const check = new Check();
const board = new Board();
const boardArray = new BoardArray();
const marking = new Marking();
const copyArrayForRestart = [];         
const workArray = [];
const cellClassNames = {
  cell: 'cell',
  cellBorder: 'border-bottom'
};

$boardContainer.addEventListener('keydown', ({target, keyCode}) => {
  turnsRegistrator.prevValue = target.value;
  target.onkeypress = () => {
    if (!(keyCode >= 49 && keyCode <= 57)){
      return false;
    }
    if (event.target.value.length >= 1){
      return false;
    }    
    return true;    
  };
});

$boardContainer.addEventListener('change', ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));
  if (target.value !== '' && turnsRegistrator.prevValue !== 0){   
    const turn = {
      cellIndex: cellIndex,
      cellValue: turnsRegistrator.prevValue
    };
    turnsRegistrator.addNewTurn(turn);
    turnsRegistrator.clearRedoStackTurns();
    turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer); 
    check.dispatchEventCheck($cells, $checkBtn);   
  }
});

$boardContainer.addEventListener('click', ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));  
  if (!target.disabled){
    marking.markRowAndColumn(cellIndex, $boardContainer);
  }  
  marking.markIdenticNumbers(target.value, $boardContainer);  
});

$undoOrRedoBtnsContainer.addEventListener('click', ({target}) => {
  switch (target.innerText) {
    case 'Undo':
      turnsRegistrator.undoTurn();
      break;
    case 'Redo':
      turnsRegistrator.redoTurn();
      break;
  }
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
});

$newGameBtn.addEventListener('click', () => { 
  timer.stop(); 
  board.clearBoard($boardContainer);
  boardArray.copyArray(workArray, shemeArray);
  boardArray.newBoardArray(workArray, $difficultyContainer);
  boardArray.copyArray(copyArrayForRestart, workArray);
  board.createBoard(workArray, cellClassNames, $boardContainer);
  turnsRegistrator.clearRedoStackTurns();
  turnsRegistrator.clearUndoStackTurns();
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
  timer.start($timerSpan);  
});

$restartBtn.addEventListener('click', ()=> {
  timer.stop();
  board.clearBoard($boardContainer);
  boardArray.copyArray(workArray, copyArrayForRestart);
  board.createBoard(workArray, cellClassNames, $boardContainer);
  turnsRegistrator.clearRedoStackTurns();
  turnsRegistrator.clearUndoStackTurns();
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
  
  timer.start($timerSpan);
});

$checkBtn.addEventListener('click', () => {
  
  const filledBoard = board.getBoard('cell', $boardContainer);  
  const $mssgContent = $modalWindow.children[0];  
  const $mssgText = document.getElementById('mssg-text');  
  if (check.checkColumnsAndRows(filledBoard) && check.checkBlocks(filledBoard)){    
    $mssgText.innerText = 'Congratulation !';
    turnsRegistrator.clearRedoStackTurns();
    turnsRegistrator.clearUndoStackTurns();
    turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
  } else {    
    $mssgContent.classList.add('warning');    
    $mssgText.innerText = 'Incorrect !';    
  }
  $modalWindow.classList.add('active');
});

$modalWindow.addEventListener('click', () => {
  const $content = $modalWindow.children[0];
  if ($content.classList.contains('warning')){
    $content.classList.toggle('warning');
  }
  $modalWindow.classList.remove('active');  
});







