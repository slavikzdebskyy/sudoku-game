
export const selectRowAndColumn = (cellIndex, $boardContainer)  => {
  const $cells = $boardContainer.getElementsByClassName('cell');
  const row = parseInt(cellIndex / 9);
  const len = $cells.length;
  const firstIndexInRow = row * 9;
  const lastIndexInRow = firstIndexInRow + 9;
  for (const el of $cells) {
    if (el.classList.contains('background-row-column')){
      el.classList.toggle('background-row-column');
    }
  }
  for (let i = firstIndexInRow; i < lastIndexInRow; i++) {
    if (i !== cellIndex){
      $cells[i].classList.toggle('background-row-column');
    }   
  }
  for (let i = cellIndex; i >= 0; i -= 9) {
    $cells[i].classList.toggle('background-row-column');
  }
  for (let i = cellIndex; i < len; i += 9) {
    $cells[i].classList.toggle('background-row-column');
  }
};


export const selectIdenticNumbers = (number, $boardContainer) => {
  const $cells = $boardContainer.getElementsByClassName('cell');
  if (number) {
    for (const el of $cells) {
      if (el.classList.contains('color-identic-numbers')){
        el.classList.toggle('color-identic-numbers');
      }
    }
  }  
  for (const el of $cells) {
    if (el.value === number && number){
      el.classList.toggle('color-identic-numbers');
    }
  }
};