import {checkSimpleArr, checkBlocks, checkColumnsAndRows} from './board_check';

const testArray = [   
  [4,5,6,7,8,9,1,2,3],
  [7,8,9,1,2,3,4,5,6],
  [1,2,3,4,5,6,7,8,9],
  [2,3,4,5,6,7,8,9,1],  
  [8,9,1,2,3,4,5,6,7],
  [5,6,7,8,9,1,2,3,4],
  [3,4,5,6,7,8,9,1,2],
  [9,1,2,3,4,5,6,7,8],
  [6,7,8,9,1,2,3,4,5]   
];

const testArray2 = [  
  [4,5,6,7,8,9,1,2,3],
  [7,8,9,5,2,3,4,5,6],
  [1,2,3,4,5,6,7,8,9],
  [2,3,4,5,6,7,8,9,1],  
  [8,9,1,2,3,4,5,6,7],
  [5,6,7,8,9,1,2,3,4],
  [9,4,5,6,7,8,9,1,2],
  [9,1,2,3,4,1,6,7,8],
  [6,7,8,9,1,2,3,4,5]
];

const testArray3 = [  
  [4,5,6,7,8,9,1,2,3],
  [9,8,9,1,2,3,4,5,6],
  [1,2,3,4,5,6,7,8,9],
  [2,3,4,5,6,7,8,9,1],  
  [8,9,1,3,3,4,5,6,7],
  [5,6,7,8,9,1,2,3,4],
  [3,4,5,6,7,8,9,4,2],
  [9,1,2,3,4,5,6,7,8],
  [6,7,1,9,1,2,3,4,5]
];

describe('checkSimpleArr(arr)=>>', () => {
  it('Test is each elements in simple array unique', () => {
    expect(checkSimpleArr([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual(true);    
  });
  
  it('Test is each elements in simple array unique', () => {
    expect(checkSimpleArr([1, 2, 1, 4, 5, 6, 7, 8, 9])).toEqual(false);    
  });  
});   


describe('checkBlocks(arr)=>>', () => {
  it('Test is each elements in blocks 3x3 of multiplication array unique', () => {
    expect(checkBlocks(testArray)).toEqual(true);    
  });
  
  it('Test is each elements in blocks 3x3 of multiplication array unique', () => {
    expect(checkBlocks(testArray2)).toEqual(false);    
  });
  it('Test is each elements in blocks 3x3 of multiplication array unique', () => {
    expect(checkBlocks(testArray3)).toEqual(false);    
  });  
});  

describe('checkColumnsAndRows(arr)=>>', () => {
  it('Test is each elements in all rows and columns of multiplication array unique', () => {
    expect(checkColumnsAndRows(testArray)).toEqual(true);    
  });
  
  it('Test is each elements in all rows and columns of multiplication array unique', () => {
    expect(checkColumnsAndRows(testArray2)).toEqual(false);    
  });
  it('Test is each elements in all rows and columns of multiplication array unique', () => {
    expect(checkColumnsAndRows(testArray3)).toEqual(false);    
  });  
});  
