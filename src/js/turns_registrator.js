export default class TurnsRegistrator {
  constructor ($board) {
    this.undoStackTurns = [];
    this.redoStackTurns = [];
    this.prevValue = 0;
    this.$cells = $board.getElementsByTagName('input');
  }

  addNewTurn (lastTurn) {
    this.undoStackTurns.push(lastTurn);
  }

  disableOrEnableBtns ($redoOrUndoBtnsContainer)  {
    const buttonsUndoRedo = $redoOrUndoBtnsContainer.getElementsByTagName('button');
    const isUndoStackTurns = Boolean(this.undoStackTurns.length);
    const isRedoStackTurns = Boolean(this.redoStackTurns.length);
    for (const el of buttonsUndoRedo) {
      if (el.innerText === 'Undo') {
        el.disabled = !isUndoStackTurns;
      }
      if (el.innerText === 'Redo') {
        el.disabled = !isRedoStackTurns;
      }
    }
  }  

  clearRedoStackTurns () {
    while (this.redoStackTurns.length) {
      this.redoStackTurns.pop();
    }
  }

  clearUndoStackTurns () {
    while (this.undoStackTurns.length) {
      this.undoStackTurns.pop();
    }
  }

  undoTurn ()  { 
    const lastIndex = this.undoStackTurns.length - 1;
    const lastTurn = this.undoStackTurns[lastIndex];
    const currentValue = this.$cells[lastTurn.cellIndex].value;
    this.$cells[lastTurn.cellIndex].value = lastTurn.cellValue;
    lastTurn.cellValue = currentValue;
    this.redoStackTurns.push(lastTurn);
    this.undoStackTurns.pop();
  }

  redoTurn ()  { 
    const lastIndex = this.redoStackTurns.length - 1;
    const lastTurn = this.redoStackTurns[lastIndex];
    const currentValue = this.$cells[lastTurn.cellIndex].value;    
    this.$cells[lastTurn.cellIndex].value = lastTurn.cellValue;
    lastTurn.cellValue = currentValue;
    this.undoStackTurns.push(lastTurn);
    this.redoStackTurns.pop();   
  }  
}
