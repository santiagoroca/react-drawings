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

    /*
    if (event.keyCode == 8 && this.currentText.length) {
      this.context.fillStyle = '#fff';
      const textLength = this.currentText.length;
      const lastLetter = this.currentText.charAt(textLength-1);
      const letterSize = this.context.measureText(lastLetter).width;
      this.context.fillRect(
        this.cursorX - letterSize,
        this.cursorY - 50,
        letterSize,
        60
      )

      this.cursorX -= letterSize;
      this.currentText = this.currentText.substring(0, textLength-1);
      return;
    }
    */

    if (event.keyCode > 47 && event.keyCode < 123) {
      this.context.fillStyle = '#000';
      this.currentText += event.key;
      this.context.fillText(event.key, this.cursorX, this.cursorY);
      this.cursorX += this.context.measureText(event.key).width;
    }

  }

  onStateChange (state, value) {}

}

export default Text
