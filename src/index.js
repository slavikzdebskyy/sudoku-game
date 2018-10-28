'use strict';

import {checkBlocks, checkColumnsAndRows} from './board.checking.js';
import {clearBoard, getBoard, copyArray, rotateRows, 
  rotateColumns, rotateBlockOfRows, rotateBlockOfColumns, 
  transportingBoard, getRandomBetweenMinAndMax} from './board.greating.js';
import {selectRowAndColumn, selectIdenticNumbers} from './board.selected.js';
import TurnsRegistrator from './turns.registrator.js';

const $boardContainer = document.getElementById('board-container');
const $modalWindow = document.getElementById('modal-check-window');

const $checkBtn = document.getElementById('check-btn'); 
const $newGameBtn = document.getElementById('new-game-btn');
const $restartBtn = document.getElementById('restart-btn'); 
const $undoOrRedoBtnsContainer = document.getElementById('undo-redo-btns');

const turnsRegistrator = new TurnsRegistrator($boardContainer);

const copyArrayForRestart = [];         
const boardArray = [];                            
const shemeArray = [                              
  [1,2,3,4,5,6,7,8,9],
  [4,5,6,7,8,9,1,2,3],
  [7,8,9,1,2,3,4,5,6],
  [2,3,4,5,6,7,8,9,1],
  [5,6,7,8,9,1,2,3,4],
  [8,9,1,2,3,4,5,6,7],
  [3,4,5,6,7,8,9,1,2],
  [6,7,8,9,1,2,3,4,5],
  [9,1,2,3,4,5,6,7,8]  
];

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
  clearBoard($boardContainer);
  copyArray(boardArray, shemeArray);
  newBoardArray(boardArray);
  copyArray(copyArrayForRestart, boardArray);
  createBoard(boardArray);
  turnsRegistrator.clearRedoStackTurns();
  turnsRegistrator.clearUndoStackTurns();
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);  
});

$restartBtn.addEventListener('click', ()=> {
  clearBoard($boardContainer);
  copyArray(boardArray, copyArrayForRestart);
  createBoard(boardArray);
  turnsRegistrator.clearRedoStackTurns();
  turnsRegistrator.clearUndoStackTurns();
  turnsRegistrator.disableOrEnableBtns($undoOrRedoBtnsContainer);
});

$checkBtn.addEventListener('click', () => {
  const filledBoard = getBoard('cell', $boardContainer);
  const $mssgContent = $modalWindow.children[0];
  const $mssgText = document.getElementById('mssg-text');  
  if (checkColumnsAndRows(filledBoard) && checkBlocks(filledBoard)){
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

const createBoard = array => {
  array.forEach((row, indexRow) => {
    row.forEach((elInRow, indexColunm) => {
      const input = document.createElement('input');
      input.setAttribute('data-index', indexRow * 9 + indexColunm);
      if (indexRow === 2 || indexRow === 5){
        input.className = 'cell border-bottom';
      } else {
        input.className = 'cell';
      }
      if (elInRow){
        input.disabled = true;
        input.value = elInRow;
      }
      $boardContainer.appendChild(input);
    });
  });  
};

const newBoardArray = array => {
  const $difficutlyCont = document.getElementById('difficulty');
  const $difficutlyVal = $difficutlyCont.getElementsByTagName('input');
  let difficulty;
  let i;
  let j;
  let randomCount;
  randomCount = Math.floor((Math.random() * 9));
  transportingBoard(array);  
  while (randomCount >= 0){
    i = getRandomBetweenMinAndMax(6, 8);
    j = getRandomBetweenMinAndMax(6, 8);
    rotateColumns(array, i, j);
    rotateRows(array, i, j);
    i = getRandomBetweenMinAndMax(3, 5);
    j = getRandomBetweenMinAndMax(3, 5);
    rotateColumns(array, i, j);
    rotateRows(array, i, j);
    i = getRandomBetweenMinAndMax(0, 2);
    j = getRandomBetweenMinAndMax(0, 2);
    rotateColumns(array, i, j);
    rotateRows(array, i, j);
    rotateBlockOfColumns(array, i, j);
    rotateBlockOfRows(array, i, j);
    randomCount--;
  }
  for (const el of $difficutlyVal) {
    if (el.checked){
      difficulty = parseInt(el.value);
    }
  }
  switch (difficulty) {
    case 0:
      difficulty = 55;      
      break;
    case 1:
      difficulty = 65;
      break;
    case 2:
      difficulty = 70;
      break;
  }
  for (let k = 0; k <= difficulty; k++){
    i = getRandomBetweenMinAndMax(0, 8);
    j = getRandomBetweenMinAndMax(0, 8);
    array[i][j] = 0;
  }  
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





