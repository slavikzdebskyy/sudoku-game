'use strict';

class TurnsRegistrator {
  constructor ($board) {
    this.undoStackTurns = [];
    this.redoStackTurns = [];
    this.prevValue = 0;
    this.$cells = $board.getElementsByTagName('input');
  }

  addNewTurn (lastTurn) {
    this.undoStackTurns.push(lastTurn);
  }

  disableOrEnableBtns ($redoOrUndoBtnsContainer)  {
    const buttonsUndoRedo = $redoOrUndoBtnsContainer.getElementsByTagName('button');
    const isUndoStackTurns = Boolean(this.undoStackTurns.length);
    const isRedoStackTurns = Boolean(this.redoStackTurns.length);
    for (const el of buttonsUndoRedo) {
      if (el.innerText === 'Undo') {
        el.disabled = !isUndoStackTurns;
      }
      if (el.innerText === 'Redo') {
        el.disabled = !isRedoStackTurns;
      }
    }
  }  

  clearRedoStackTurns () {
    while (this.redoStackTurns.length) {
      this.redoStackTurns.pop();
    }
  }

  clearUndoStackTurns () {
    while (this.undoStackTurns.length) {
      this.undoStackTurns.pop();
    }
  }

  undoTurn ()  { 
    const lastIndex = this.undoStackTurns.length - 1;
    const lastTurn = this.undoStackTurns[lastIndex];
    const currentValue = this.$cells[lastTurn.cellIndex].value;

    this.$cells[lastTurn.cellIndex].value = lastTurn.cellValue;
    lastTurn.cellValue = currentValue;
    this.redoStackTurns.push(lastTurn);
    this.undoStackTurns.pop();
  }

  redoTurn ()  { 
    const lastIndex = this.redoStackTurns.length - 1;
    const lastTurn = this.redoStackTurns[lastIndex];
    const currentValue = this.$cells[lastTurn.cellIndex].value;

    this.$cells[lastTurn.cellIndex].value = lastTurn.cellValue;
    lastTurn.cellValue = currentValue;
    this.undoStackTurns.push(lastTurn);
    this.redoStackTurns.pop();
  }
  
}

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
    selectRowAndColumn(cellIndex);
  }  
  selectIdenticNumbers(target.value);  
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
  const filledBoard = getBoard();
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

const copyArray = (copyArray, originalArray) => {  
  copyArray.length = 0;
  originalArray.forEach(row => {    
    copyArray.push(row);    
  });
};


const clearBoard = $board => {
  while ($board.firstChild){
    $board.removeChild($board.firstChild);
  }
};

const checkSimpleArr = array => { 
  let isUnique = true;
  array.forEach((el, index) => {
    if (array.slice(index + 1, array.length).includes(el)){
      isUnique = false;
    }    
  });
  return isUnique;
};

const checkColumnsAndRows = array => {
  let j = 0;
  let isUnique = true;
  const arrLength = array.length;
  array.forEach(row => {
    if (!checkSimpleArr(row)){
      isUnique = false;
    }
  });
  while (j < arrLength){    
    const column = array.map(el=>{
      return el[j];
    });    
    if (!checkSimpleArr(column)){      
      isUnique = false;
    }
    j++;    
  }  
  return isUnique;
};

const checkBlocks = array => {
  const block1 = [];
  const block2 = [];
  const block3 = [];  
  let isUnique = true;
  array.forEach(el => {
    block1.push(el.slice(0,3));
    block2.push(el.slice(3,6));
    block3.push(el.slice(6,9));
    if (block1.length === 9){
      if (!checkSimpleArr(block1)) {
        isUnique = false;
      }
      if (!checkSimpleArr(block2)) {
        isUnique = false;
      }
      if (!checkSimpleArr(block3)) {
        isUnique = false;
      }      
      block1.length = 0;
      block2.length = 0;
      block3.length = 0;
    }
  });
  return isUnique;
};

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

const getBoard = () => {
  const $cells = $boardContainer.getElementsByClassName('cell');
  const cellsLength = $cells.length;
  const board = [];
  let row = [];  
  let koef = 1;
  for (let i = 0; i < cellsLength; i++){
    if ((9 * koef) > i){
      row.push($cells[i].value);      
    } else {
      board.push(row);
      koef++;
      row = [];
      row.push($cells[i].value);
    }        
  }
  board.push(row);
  return board;
};

const rotateRows = (array, firstIndex, secondIndex) => {   
  if ((firstIndex >= 0 && secondIndex <= 2) ||
    (firstIndex >= 3 && secondIndex <= 5) ||
    (firstIndex >= 6 && secondIndex <= 8)){
    const el = array[firstIndex]; 
    array.splice(firstIndex, 1, array[secondIndex]);
    array.splice(secondIndex, 1, el);
  } else {
    return;
  }
};

const rotateColumns = (array, firstIndex, secondIndex) => {
  let helpElem;
  if ( (firstIndex >= 0 && secondIndex <= 2) ||
      (firstIndex >= 3 && secondIndex <= 5) ||
      (firstIndex >= 6 && secondIndex <= 8)    ){
    array.forEach(el => {
      helpElem = el[firstIndex];
      el[firstIndex] = el[secondIndex];
      el[secondIndex] = helpElem;
    });
  } else {
    return;
  }
};

const rotateBlockOfRows = (array, firstBlock, secondBlock) => {
  if ( (firstBlock < 1) || (firstBlock > 3) ||
      (secondBlock < 1) || (secondBlock > 3) ||
      (firstBlock === secondBlock)) {        
    return;
  }
  let helpRow;
  if ( ((firstBlock === 1) && (secondBlock === 2)) ||
      ((firstBlock === 2) && (secondBlock === 1))) { 
    helpRow = array[0]; 
    array.splice(0, 1, array[3]);
    array.splice(3, 1, helpRow);
    helpRow = array[1]; 
    array.splice(1, 1, array[4]);
    array.splice(4, 1, helpRow);
    helpRow = array[2]; 
    array.splice(2, 1, array[5]);
    array.splice(5, 1, helpRow);
  } else {
    if ( ((firstBlock === 1) && (secondBlock === 3)) ||
        ((firstBlock === 3) && (secondBlock === 1))) {
      helpRow = array[0]; 
      array.splice(0, 1, array[6]);
      array.splice(6, 1, helpRow);
      helpRow = array[1]; 
      array.splice(1, 1, array[7]);
      array.splice(7, 1, helpRow);
      helpRow = array[2]; 
      array.splice(2, 1, array[8]);
      array.splice(8, 1, helpRow);
    } else {
      if ( ((firstBlock === 2) && (secondBlock === 3)) ||
          ((firstBlock === 3) && (secondBlock === 2))) {
        helpRow = array[3]; 
        array.splice(3, 1, array[6]);
        array.splice(6, 1, helpRow);
        helpRow = array[4]; 
        array.splice(4, 1, array[7]);
        array.splice(7, 1, helpRow);
        helpRow = array[5]; 
        array.splice(5, 1, array[8]);
        array.splice(8, 1, helpRow);
      }
    }
  }
};

const rotateBlockOfColumns = (array, firstBlock, secondBlock) => {
  if ( (firstBlock < 1) || (firstBlock > 3) ||
      (secondBlock < 1) || (secondBlock > 3) ||
      (firstBlock === secondBlock)) {        
    return;
  }
  let helpElem;
  if ( ((firstBlock === 1) && (secondBlock === 2)) ||
      ((firstBlock === 2) && (secondBlock === 1))) {
    array.forEach(el => {
      helpElem = el[0];
      el[0] = el[3];
      el[3] = helpElem;
      helpElem = el[1];
      el[1] = el[4];
      el[4] = helpElem;
      helpElem = el[2];
      el[2] = el[5];
      el[5] = helpElem;
    });
  } else {
    if ( ((firstBlock === 1) && (secondBlock === 3)) ||
        ((firstBlock === 3) && (secondBlock === 1))) {
      array.forEach(el => {
        helpElem = el[0];
        el[0] = el[6];
        el[6] = helpElem;
        helpElem = el[1];
        el[1] = el[7];
        el[7] = helpElem;
        helpElem = el[2];
        el[2] = el[8];
        el[8] = helpElem;
      });
    } else {
      if ( ((firstBlock === 2) && (secondBlock === 3)) ||
          ((firstBlock === 3) && (secondBlock === 2))){
        array.forEach(el => {
          helpElem = el[3];
          el[3] = el[6];
          el[6] = helpElem;
          helpElem = el[4];
          el[4] = el[7];
          el[7] = helpElem;
          helpElem = el[5];
          el[5] = el[8];
          el[8] = helpElem;
        });
      }
    }
  }
};

const transportingBoard = array => {
  const copyArr = array.slice(0, array.length);
  const len = array.length;
  let row = [];  
  array.length = 0;
  for (let i = 0; i < len; i++){
    for (let j = 0; j < len; j++){
      row.push(copyArr[j][i]);
    }
    array.push(row);
    row = [];
  }
};

const getRandomBetweenMinAndMax = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  // for (let k = 0; k <= difficulty; k++){
  //   i = getRandomBetweenMinAndMax(0, 8);
  //   j = getRandomBetweenMinAndMax(0, 8);
  //   array[i][j] = 0;
  // }  
};

const selectRowAndColumn = cellIndex => {
  const $cells = $boardContainer.getElementsByClassName('cell');
  const row = parseInt(cellIndex / 9);
  const len = $cells.length;
  const firstIndexInRow = row * 9;
  const lastIndexInRow = firstIndexInRow + 9;
  for (const el of $cells) {
    if (el.classList.contains('background-row-column')){
      el.classList.toggle('background-row-column');
    }
  }
  for (let i = firstIndexInRow; i < lastIndexInRow; i++) {
    if (i !== cellIndex){
      $cells[i].classList.toggle('background-row-column');
    }   
  }
  for (let i = cellIndex; i >= 0; i -= 9) {
    $cells[i].classList.toggle('background-row-column');
  }
  for (let i = cellIndex; i < len; i += 9) {
    $cells[i].classList.toggle('background-row-column');
  }
};


const selectIdenticNumbers = number => {
  const $cells = $boardContainer.getElementsByClassName('cell');
  if (number) {
    for (const el of $cells) {
      if (el.classList.contains('color-identic-numbers')){
        el.classList.toggle('color-identic-numbers');
      }
    }
  }  
  for (const el of $cells) {
    if (el.value === number && number){
      el.classList.toggle('color-identic-numbers');
    }
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


