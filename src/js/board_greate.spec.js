import {getRandomBetweenMinAndMax} from './board_greate';

describe('getRandomBetweenMinAndMax(min, max)=>>', () => {
  it('That function generetes and returns number between 10 and 15', () => {
    expect(getRandomBetweenMinAndMax(10, 15)).toBeWithinRange(10, 15);    
  });
  
  it('That function generetes and returns number between 1 and 5', () => {
    expect(getRandomBetweenMinAndMax(1, 5)).toBeWithinRange(1, 5);    
  }); 
  
  it('That function generetes and returns number between 3 and 4', () => {
    expect(getRandomBetweenMinAndMax(3, 4)).toBeWithinRange(3, 4);    
  }); 
}); 