class Text {

  constructor (context) {
    this.cursorX = 0;
    this.cursorY = 0;
    this.currentText = '';
  }

  setContext (context) {
    this.context = context;
  }

  enable () {
    this.context.font = "50px Georgia";
    this.context.fillStyle = '#000';
  }

  onMouseDown (event) {
    this.currentText = '';
    this.cursorX = event.clientX;
    this.cursorY = event.clientY;
  }

  onMouseMove () {}

  onMouseUp () {}

  onKeyPress (event) {

    if (event.key.match(/^[ a-z0-9:=<>]$/i)) {
      this.context.fillStyle = '#000';
      this.currentText += event.key;
      this.context.fillText(event.key, this.cursorX, this.cursorY);
      this.cursorX += this.context.measureText(event.key).width;
    }

  }

  onStateChange (state, value) {}

}

export default Text
