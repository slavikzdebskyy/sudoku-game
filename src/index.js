

'use strict';

const $field = document.getElementById('field');  //  div => game board
const $checkBtn = document.getElementById('check-btn'); // button Check

const net = [
  [0,2,3,4,5,6,7,8,9],
  [4,0,6,7,8,9,1,2,3],
  [7,8,0,1,2,3,4,5,6],
  [2,3,4,0,6,7,8,9,1],
  [5,6,7,8,0,1,2,3,4],
  [8,9,1,2,3,0,5,6,7],
  [3,4,5,6,7,8,0,1,2],
  [6,7,8,9,1,2,3,0,5],
  [9,1,2,3,4,5,6,7,0]  
];

// [1,2,3,4,5,6,7,8,9],
// [4,5,6,7,8,9,1,2,3],
// [7,8,9,1,2,3,4,5,6],
// [2,3,4,5,6,7,8,9,1],
// [5,6,7,8,9,1,2,3,4],
// [8,9,1,2,3,4,5,6,7],
// [3,4,5,6,7,8,9,1,2],
// [6,7,8,9,1,2,3,4,5],
// [9,1,2,3,4,5,6,7,8]  


//  input's validation (user can enter only numbers):
$field.addEventListener('keydown', ({target, keyCode}) => { 
  target.onkeypress = () => {
    if(!(keyCode >= 49 && keyCode <= 57)){
      return false;
    }
    if(event.target.value.length >= 1){
      return false;
    }
    return true;    
  };
});// END of input's validation

//  input set in focus when mouseover(hover):
$field.addEventListener('mouseover', ({target}) => {
  target.focus();
});//  END of input set in focus when mouseover(hover)

$checkBtn.addEventListener('click', () => {
  const filledBoard = getBoard();
  if(checkColumnsAndRows(filledBoard) && checkBlocks(filledBoard)){
    console.log('Well done');
  } else {
    console.error('Wrong !!!');
  }
  // console.log(filledBoard);
});

//  function checkSimpleArr(arr) checks whether 
//  all the elements are unique in a simple array
//  return "false" if elements repeat
//  return "true" if all elements is unique:
const checkSimpleArr = array => { 
  let check = true;
  array.forEach((el, index) => {
    if(array.slice(index + 1, array.length).includes(el)){
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
    if(!checkSimpleArr(el)){
      check = false;
    }
  });
  while(j < len){    
    column = array.map(el=>{
      return el[j];
    });     
    if(!checkSimpleArr(column)){      
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
    if(block1.length === 9){
      if(!checkSimpleArr(block1)) {
        check = false;
      }
      if(!checkSimpleArr(block2)) {
        check = false;
      }
      if(!checkSimpleArr(block3)) {
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
  array.forEach((el, index) => {
    el.forEach(elChild => {
      const input = document.createElement('input');
      if(index === 2 || index === 5){
        input.className = 'cell brdr-bttm';
      } else {
        input.className = 'cell';
      }
      if(elChild){
        input.disabled = true;
        input.value = elChild;
      }
      $field.appendChild(input);
    });
  });  
};//  END of function createBoard(arr)

//  function getBoard() returns array from game board
//  that the user has filled in
const getBoard = () => {
  const $cells = $field.getElementsByClassName('cell');
  const len = $cells.length;
  const board = [];
  let row =[];  
  let koef = 1;
  for(let i = 0; i < len; i++){
    if((9 * koef) > i){
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
  if((firstIndex >= 0 && secondIndex <=2) ||
    (firstIndex >= 3 && secondIndex <=5) ||
    (firstIndex >= 6 && secondIndex <=8)){
    const el = array[firstIndex]; 
    array.splice(firstIndex, 1, array[secondIndex]);
    array.splice(secondIndex, 1, el);
  }
  else {
    return;
  }
};//  END of function rotateRows(arr, firstIndex, secondIndex)

//  function rotateColumns(arr, firstIndex, secondIndex) rotates 2 columns
const rotateColumns = (array, firstIndex, secondIndex) => {
  let helpElem;
  if( (firstIndex >= 0 && secondIndex <=2) ||
      (firstIndex >= 3 && secondIndex <=5) ||
      (firstIndex >= 6 && secondIndex <=8)    ){
    array.forEach(el => {
      helpElem = el[firstIndex];
      el[firstIndex] = el[secondIndex];
      el[secondIndex] = helpElem;
    });
  }
  else {
    return;
  }
};// END function rotateColumns(arr, firstIndex, secondIndex)

//  function rotateBlockOfRows(arr, firstBlock, secondBlock) 
//  rotates 2 blocks(1 block contains 3 rows):
const rotateBlockOfRows = (array, firstBlock, secondBlock) => {
  if( (firstBlock < 1) || (firstBlock > 3) ||
      (secondBlock < 1) || (secondBlock > 3) ||
      (firstBlock === secondBlock)) {        
    return;
  }
  let helpRow;
  if( ((firstBlock === 1) && (secondBlock === 2)) ||
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
    if( ((firstBlock === 1) && (secondBlock === 3)) ||
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
      if( ((firstBlock === 2) && (secondBlock === 3)) ||
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
  if( (firstBlock < 1) || (firstBlock > 3) ||
      (secondBlock < 1) || (secondBlock > 3) ||
      (firstBlock === secondBlock)) {        
    return;
  }
  let helpElem;
  if( ((firstBlock === 1) && (secondBlock === 2)) ||
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
    if( ((firstBlock === 1) && (secondBlock === 3)) ||
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
      if( ((firstBlock === 2) && (secondBlock === 3)) ||
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
  while(array.length){
    array.pop();
  }
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len; j++){
      row.push(copyArr[j][i]);
    }
    array.push(row);
    row = [];
  }
};//  END of function transportingBoard(arr)







// transportingBoard(net);
// rotateTripleColumns(net, 1,4)
// rotateRows(net, 0, 3);
// triple
// rotateRows(net,6,7);
// rotateColumns(net, 0, 2);
// console.log(arr);





transportingBoard(net);
rotateColumns(net, 1, 3);
rotateColumns(net, 4, 6);
rotateColumns(net, 7, 8);
rotateColumns(net, 4, 5);
rotateRows(net, 1, 3);
rotateRows(net, 4, 6);
rotateRows(net, 7, 8);
rotateRows(net, 4, 5);
rotateBlockOfColumns(net, 1, 3);
rotateBlockOfRows(net, 2, 3);
createBoard(net);