'use strict';

import * as check from './board_check.js';
import * as greateBoard from './board_greate.js';
import TurnsRegistrator from './turns_registrator.js';
import Timer from './timer.js';
import { selectRowAndColumn, selectIdenticNumbers } from './board_select.js';
import { shemeArray } from './sheme_array.js';

const $boardContainer = document.getElementById('board-container');
const $modalWindow = document.getElementById('modal-check-window');
const $difficultyContainer = document.getElementById('difficulty');
const $undoOrRedoBtnsContainer = document.getElementById('undo-redo-btns');

const $checkBtn = document.getElementById('check-btn'); 
const $newGameBtn = document.getElementById('new-game-btn');
const $restartBtn = document.getElementById('restart-btn'); 

const $timerSpan = document.getElementById('timer');

const turnsRegistrator = new TurnsRegistrator($boardContainer);
const timer = new Timer();
const copyArrayForRestart = [];         
const boardArray = [];

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
    dispatchEventCheck();   
  }
});

$boardContainer.addEventListener('click', ({target}) => {
  const cellIndex = parseInt(target.getAttribute('data-index'));  
  if (!target.disabled){
    selectRowAndColumn(cellIndex, $boardContainer);
  }  
  selectIdenticNumbers(target.value, $boardContainer);  
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
  greateBoard.clearBoard($boardContainer);
  greateBoard.copyArray(boardArray, shemeArray);
  greateBoard.newBoardArray(boardArray, $difficultyContainer);
  greateBoard.copyArray(copyArrayForRestart, boardArray);
  createBoard(boardArray, 'cell', 'border-bottom');
  turnsRegistrator.clearRedoStackTurns();
  turnsRegistrator.clearUndoStackTurns();
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
  timer.start($timerSpan);  
});

$restartBtn.addEventListener('click', ()=> {
  timer.stop();
  greateBoard.clearBoard($boardContainer);
  greateBoard.copyArray(boardArray, copyArrayForRestart);
  createBoard(boardArray, 'cell', 'border-bottom');
  turnsRegistrator.clearRedoStackTurns();
  turnsRegistrator.clearUndoStackTurns();
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
  
  timer.start($timerSpan);
});

$checkBtn.addEventListener('click', () => {
  const filledBoard = greateBoard.getBoard('cell', $boardContainer);
  const $mssgContent = $modalWindow.children[0];
  const $mssgText = document.getElementById('mssg-text');  
  if (check.checkColumnsAndRows(filledBoard) && check.checkBlocks(filledBoard)){
    $mssgText.innerText = 'Congratulation !';
    turnsRegistrator.clearRedoStackTurns();
    turnsRegistrator.clearUndoStackTurns();
    turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
  } else {
    $mssgContent.classList.toggle('warning');
    $mssgText.innerText = 'Incorrect !';    
  }
  $modalWindow.classList.add('active');
});

$modalWindow.addEventListener('click', () => {
  const $content = $modalWindow.children[0];
  if ($content.classList.contains('warning')){
    $content.classList.toggle('warning');
  }
  $modalWindow.classList.toggle('active');  
});

const createBoard = (array, cellClassName, cellBorderClassName) => {
  array.forEach((row, indexRow) => {
    row.forEach((elInRow, indexColunm) => {
      const input = document.createElement('input');
      input.setAttribute('data-index', indexRow * 9 + indexColunm);
      if (indexRow === 2 || indexRow === 5){
        input.className = cellClassName + ' ' + cellBorderClassName;
      } else {
        input.className = cellClassName;
      }
      if (elInRow){
        input.disabled = true;
        input.value = elInRow;
      }
      $boardContainer.appendChild(input);
    });
  });  
};

const dispatchEventCheck = () => {
  const event = document.createEvent('HTMLEvents');
  const $cells = $boardContainer.getElementsByClassName('cell');  
  const filledCellsArray = [];
  event.initEvent('click', true, true);
  for (const el of $cells) {
    if (el.value) {
      filledCellsArray.push(el.value);
    }
  }
  if (filledCellsArray.length === 81) {
    $checkBtn.dispatchEvent(event);
  }  
};





