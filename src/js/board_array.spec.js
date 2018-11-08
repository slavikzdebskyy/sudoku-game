import BoardArray from './board_array';

const boardArr = new BoardArray;

expect.extend({
  toBeWithinRange (received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

describe('getRandomBetweenMinAndMax(min, max)=>>', () => {
  it('That function generetes and returns number between 10 and 15', () => {
    expect(boardArr.getRandomBetweenMinAndMax(10, 15)).toBeWithinRange(10, 15);    
  });
  
  it('That function generetes and returns number between 1 and 5', () => {
    expect(boardArr.getRandomBetweenMinAndMax(1, 5)).toBeWithinRange(1, 5);    
  }); 
  
  it('That function generetes and returns number between 3 and 4', () => {
    expect(boardArr.getRandomBetweenMinAndMax(3, 4)).toBeWithinRange(3, 4);    
  }); 
}); 