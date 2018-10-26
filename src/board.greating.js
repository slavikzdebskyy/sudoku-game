
export const clearBoard = $board => {
  while ($board.firstChild){
    $board.removeChild($board.firstChild);
  }
};

export const getBoard = (CellClassName, $boardContainer) => {
  const $cells = $boardContainer.getElementsByClassName(CellClassName);
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

export const copyArray = (copyArray, originalArray) => {  
  copyArray.length = 0;
  originalArray.forEach(row => {    
    copyArray.push(row);    
  });
};

export const rotateRows = (array, firstIndex, secondIndex) => {   
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

export const rotateColumns = (array, firstIndex, secondIndex) => {
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

export const rotateBlockOfRows = (array, firstBlock, secondBlock) => {
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

export const rotateBlockOfColumns = (array, firstBlock, secondBlock) => {
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

export const transportingBoard = array => {
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

export const getRandomBetweenMinAndMax = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};








