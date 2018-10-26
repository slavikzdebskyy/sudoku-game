const checkSimpleArr = array => { 
  let isUnique = true;
  array.forEach((el, index) => {
    if (array.slice(index + 1, array.length).includes(el)){
      isUnique = false;
    }    
  });
  return isUnique;
};

export const checkColumnsAndRows = array => {
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

export const checkBlocks = array => {
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


