

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
//  all the elements are unique in a simple array:
const checkSimpleArr = array => { 
  const len = array.length;
  for(let i = 0; i < len; i++){
    for(let j = i + 1; j < len; j++){
      if(array[i] === array[j]){
        return false;
      }
    }
  }
  return true;
};//  END function checkSimpleArr(arr)


//  function checkColumnsAndRows(arr) checks whether 
//  all the elements are unique in rows and columns of array:
const checkColumnsAndRows = array => {
  let j = 0;
  let column;
  const len = array.length;
  do {
    for(let i = 0; i < len; i++){
      if(!checkSimpleArr(array[i])){
        return false;
      }
      column = array.map(el=>{
        return el[j];
      });     
    }
    if(!checkSimpleArr(column)){      
      return false;
    }
    j++;    
  } while(j < len);  
  return true;
};//  END of function checkColumnsAndRows(arr)

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

//  function rotateRows(arr, firstIndex, secondIndex) rotates rows
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







// rotateRows(net,6,7);

createBoard(net);
