'use strict'

const $field = document.getElementById('field');
const $cells = $field.getElementsByClassName('cell');

$field.addEventListener('keydown', ({target, keyCode}) => { // validation for Inputs: user can enter only numbers
  console.log(keyCode);
  target.onkeypress = () => {
    if(!(keyCode >= 49 && keyCode <= 57)){
      return false;
    }
    if(event.target.value.length >= 1){
      return false;
    }
    return true;    
  }
})

