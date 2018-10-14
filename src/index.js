

'use strict';

const $field = document.getElementById('field');  //  div => game board

const net = [
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
    return array;
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
    return array;
  }
};// END function rotateColumns(arr, firstIndex, secondIndex)






// triple


// rotateRows(net,6,7);
// rotateColumns(net, 0, 2);
// createBoard(net);
// console.log(getBoard());