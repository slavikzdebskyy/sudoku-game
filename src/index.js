'use strict';


class TurnsRegistrator {
  constructor () {
    this.stackTurns = [];
    this.stackRedoTurns = [];
    this.prevValue = 0;
  }

  addNewTurn (el) {
    this.stackTurns.push(el);
  }

  getLastTurn () {
    return this.stackTurns[stackTurns.length - 1];
  }
}

const $boardContainer = document.getElementById('board-container');
const $modalWindow = document.getElementById('modal-check-window');

const $checkBtn = document.getElementById('check-btn'); 
const $newGameBtn = document.getElementById('nwgm-btn');
const $restartBtn = document.getElementById('rstrt-btn'); 
const $undoOrRedoBtns = document.getElementById('undo-redo-btns');

const turnsRegistrator = new TurnsRegistrator();

// console.log(turnsRegistrator);
const stackTurns = [];
const stackRedoTurns = [];
let prevValue;


const copyArrayForRestart = [];                            // copy boardArray if user want replay this puzzle
const boardArray = [];                                     // renderer array on board
const shemeArray = [                                       // sheme array for create new boardArray
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






//  input's validation (user can enter only numbers)
//  and set prevVlue:
$boardContainer.addEventListener('keydown', ({target, keyCode}) => {
  prevValue = target.value;
  target.onkeypress = () => {
    if (!(keyCode >= 49 && keyCode <= 57)){
      return false;
    }
    if (event.target.value.length >= 1){
      return false;
    }    
    return true;    
  };
});// END of input's validation

$undoOrRedoBtns.addEventListener('click', ({target}) => {
  undoOrRedoLastTurn(stackTurns, stackRedoTurns, target.innerText);
});

// when user entered some number in cell - this turn will
// push to stackArr:
$boardContainer.addEventListener('change', ({target}) => {
  if (target.value !== '' && prevValue !== 0){
    addTurnToStackArray(target.name, prevValue);
  }
});// END onchange event;

//  input set in focus when mouseover(hover):
$boardContainer.addEventListener('mouseover', ({target}) => {
  target.focus();   
});//  END of input set in focus when mouseover(hover);

// add event on button New Game:
$newGameBtn.addEventListener('click', () => {  
  clearBoard($boardContainer);
  copyArray(boardArray, shemeArray);
  newBoardArray(boardArray);
  copyArray(copyArrayForRestart, boardArray);
  createBoard(boardArray);
});// END of add event on button New Game;

// add event on button Restart:
$restartBtn.addEventListener('click', ()=> {
  clearBoard($boardContainer);
  copyArray(boardArray, copyArrayForRestart);
  createBoard(boardArray);
});// END of add event on button Restart

//  add event on modal message window (close this window):
$modalWindow.addEventListener('click', () => {
  const $content = $modalWindow.children[0];
  if ($content.classList.contains('warning')){
    $content.classList.toggle('warning');
  }
  $modalWindow.classList.toggle('active');  
});//  END of add event on modal message window;

//  add event on button Check:
$checkBtn.addEventListener('click', () => {
  const filledBoard = getBoard();
  const $mssgContent = $modalWindow.children[0];
  const $mssgText = document.getElementById('mssg-text');
  $modalWindow.classList.add('active');
  if (checkColumnsAndRows(filledBoard) && checkBlocks(filledBoard)){
    $mssgText.innerText = 'Congratulation !';
  } else {
    $mssgContent.classList.toggle('warning');
    $mssgText.innerText = 'Incorrect !';    
  }
});//  END of add event on button Check;

//  function copyArray(copyArr, originalArr) creates copy of array:
const copyArray = (copyArray, originalArray) => {
  let rowHelp = [];
  while (copyArray.length){
    copyArray.pop();
  }
  originalArray.forEach(row => {
    row.forEach(el => {
      rowHelp.push(el);
    });
    copyArray.push(rowHelp);
    rowHelp = [];
  });
};//  END function copyArray(copyArr, originalArr);

//  function clearBord($board) deletes all 
//  children in $board:
const clearBoard = $board => {
  while ($board.firstChild){
    $board.removeChild($board.firstChild);
  }
};//  END of function clearBord($board);

//  function checkSimpleArr(arr) checks whether 
//  all the elements are unique in a simple array
//  return "false" if elements repeat
//  return "true" if all elements is unique:
const checkSimpleArr = array => { 
  let check = true;
  array.forEach((el, index) => {
    if (array.slice(index + 1, array.length).includes(el)){
      check = false;
    }    
  });
  return check;
};//  END function checkSimpleArr(arr)


//  function checkColumnsAndRows(arr) checks whether 
//  all the elements are unique in rows and columns of array(board)
//  return "false" if elements repeat
//  return "true" if all elements is unique:
const checkColumnsAndRows = array => {
  let j = 0;
  let column;
  let check = true;
  const len = array.length;
  array.forEach(el => {
    if (!checkSimpleArr(el)){
      check = false;
    }
  });
  while (j < len){    
    column = array.map(el=>{
      return el[j];
    });     
    if (!checkSimpleArr(column)){      
      check = false;
    }
    j++;    
  }
  return check;
};//  END of function checkColumnsAndRows(arr)

//  function checkBlocks(arr) checks whether 
//  all the elements are unique in blocks of array(board)
//  return "false" if elements repeat
//  return "true" if all elements is unique:
const checkBlocks = array => {
  let block1 = [];
  let block2 = [];
  let block3 = [];  
  let check = true;
  array.forEach(el => {
    block1 = block1.concat(el.slice(0,3));
    block2 = block2.concat(el.slice(3,6));
    block3 = block3.concat(el.slice(6,9));
    if (block1.length === 9){
      if (!checkSimpleArr(block1)) {
        check = false;
      }
      if (!checkSimpleArr(block2)) {
        check = false;
      }
      if (!checkSimpleArr(block3)) {
        check = false;
      }      
      block1 = [];
      block2 = [];
      block3 = [];
    }
  });
  return check;
};//  END of function checkBlocks(arr)

//  function createBoard(arr) creates HTML tags
//  and rendered start board:
const createBoard = array => {
  array.forEach((row, indexRow) => {
    row.forEach((elInRow, indexInRow) => {
      const input = document.createElement('input');
      input.name = indexRow + ',' + indexInRow;
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
};//  END of function createBoard(arr)

//  function getBoard() returns array from game board
//  that the user has filled in
const getBoard = () => {
  const $cells = $boardContainer.getElementsByClassName('cell');
  const len = $cells.length;
  const board = [];
  let row = [];  
  let koef = 1;
  for (let i = 0; i < len; i++){
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
};//  END function getBoard()

//  function rotateRows(arr, firstIndex, secondIndex) rotates 2 rows
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
};//  END of function rotateRows(arr, firstIndex, secondIndex)

//  function rotateColumns(arr, firstIndex, secondIndex) rotates 2 columns
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
};// END function rotateColumns(arr, firstIndex, secondIndex)

//  function rotateBlockOfRows(arr, firstBlock, secondBlock) 
//  rotates 2 blocks(1 block contains 3 rows):
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

//  function rotateBlockOfColumns(arr, firstBlock, secondBlock) 
//  rotates 2 blocks(1 block contains 3 columns):
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
};//  END of function rotateBlockOfColumns(arr, firstBlock, secondBlock) 


//  function transportingBoard(arr) rotate array
//  columns => rows
//  rows => columns:
const transportingBoard = array => {
  const copyArr = array.slice(0, array.length);
  const len = array.length;
  let row = [];
  while (array.length){
    array.pop();
  }
  for (let i = 0; i < len; i++){
    for (let j = 0; j < len; j++){
      row.push(copyArr[j][i]);
    }
    array.push(row);
    row = [];
  }
};//  END of function transportingBoard(arr)

//  function return random number 
//  between min value and max value:
const getRandomBetweenMinAndMax = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};//  END of function getRandomBetweenMinAndMax(min, max);

//  function newBoardArray(arr) rotates array N times,
//  where N is random number between 1 and 9;
//  After that this function removes some
//  squares on board. Amount of removed squares
//  depends on difficulty:
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
};//  END of function newBoardArray(arr);

// function addTurnToStackArray(koordSrt, val) pushing 
//  koordinate and value cell in steckOfTurns: 
const addTurnToStackArray = (koordStr, value) => {
  const koord = koordStr.split(',').map(el => {
    return parseInt(el);
  });
  const turn = {
    row: koord[0],
    col: koord[1],
    value: value
  };
  stackTurns.push(turn);
};// END of function addTurnToStackArray(koordSrt, val);


const undoOrRedoLastTurn = (stackTurns, backupStack, undoOrRedo) => {
  const sTLen = stackTurns.length;
  const bSLen = backupStack.length;
  const $inputs = $boardContainer.getElementsByTagName('input');
  
  const prev = (sTLen) ? stackTurns[sTLen - 1] : 0;
  const indexOfPrevImput = (sTLen) ? prev.row * 9 + prev.col : 0;
  const currentPrevVavue = (sTLen) ? $inputs[indexOfPrevImput].value : 0;
  const next = (bSLen) ? backupStack[bSLen - 1] : 0;
  const indexOfNextImput = (bSLen) ? next.row * 9 + next.col : 0;
  const currentNextValue = (bSLen) ? $inputs[indexOfNextImput].value : 0;

  switch (undoOrRedo){
    case 'Undo':        
      $inputs[indexOfPrevImput].value = prev.value;
      prev.value = currentPrevVavue;
      backupStack.push(prev);
      stackTurns.pop();
      break;
    case 'Redo':      
      $inputs[indexOfNextImput].value = next.value;
      next.value = currentNextValue;
      stackTurns.push(next);
      backupStack.pop();
      break;
    default:
      return;
  }
};











// newBoardArray(boardArray);
// createBoard(boardArray);
