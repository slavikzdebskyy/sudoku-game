export default class Board {

  clearBoard ($board) {
    while ($board.firstChild){
      $board.removeChild($board.firstChild);
    }
  }
  
  getBoard (CellClassName, $boardContainer) {
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
  }
  createBoard (array, cellClassNames, $boardContainer) {
    array.forEach((row, indexRow) => {
      row.forEach((elInRow, indexColunm) => {
        const input = document.createElement('input');
        input.setAttribute('data-index', indexRow * 9 + indexColunm);
        if (indexRow === 2 || indexRow === 5){
          input.className = cellClassNames.cell + ' ' + cellClassNames.cellBorder;
        } else {
          input.className = cellClassNames.cell;
        }
        if (elInRow){
          input.disabled = true;
          input.value = elInRow;
        }
        $boardContainer.appendChild(input);
      });
    });  
  }
}
