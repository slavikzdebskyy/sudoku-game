export default class Check {
  
  checkSimpleArr (array) { 
    let isUnique = true;
    array.forEach((el, index) => {
      if (array.slice(index + 1, array.length).includes(el)){
        isUnique = false;
      }    
    });
    return isUnique;
  }

  checkColumnsAndRows (array) {
    let j = 0;
    let isUnique = true;
    const arrLength = array.length;
    array.forEach(row => {
      if (!this.checkSimpleArr(row)){
        isUnique = false;
      }
    });
    while (j < arrLength){    
      const column = array.map(el=>{
        return el[j];
      });    
      if (!this.checkSimpleArr(column)){      
        isUnique = false;
      }
      j++;    
    }  
    return isUnique;
  }

  checkBlocks (array) {
    const block1 = [];
    const block2 = [];
    const block3 = [];  
    let isUnique = true;
    array.forEach(el => {
      el.slice(0,3).forEach(elem => {
        block1.push(elem);
      });
      el.slice(3,6).forEach(elem => {
        block2.push(elem);
      });
      el.slice(6,9).forEach(elem => {
        block3.push(elem);
      });    
      if (block1.length === 9){
        if (!this.checkSimpleArr(block1)) {
          isUnique = false;
        }
        if (!this.checkSimpleArr(block2)) {
          isUnique = false;
        }
        if (!this.checkSimpleArr(block3)) {
          isUnique = false;
        }         
        block1.length = 0;
        block2.length = 0;
        block3.length = 0;      
      }
    });
    return isUnique;
  }
  dispatchEventCheck ($cells, $checkBtn) {
    const event = document.createEvent('HTMLEvents');    
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
  }
}