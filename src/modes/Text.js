class Pen {

  constructor (context) {
    this.cursorX = 0;
    this.cursorY = 0;
  }

  setContext (context) {
    this.context = context;
  }

  enable () {}

  onMouseDown (event) {
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }

  onMouseMove () {}

  onMouseUp () {}

  onKeyPress (event) {
    console.log(event);
    this.context.fillText(event.key, this.cursorX, this.cursorY);
  }

  onStateChange (state, value) {}

}

export default Pen
