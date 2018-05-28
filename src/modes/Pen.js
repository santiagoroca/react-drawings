const CHANGE_ACTIVE_COLOR = 0;

class Pen {

  constructor (context) {
    this.lastX = 0;
    this.lastY = 0;
    this.drawing = false;
    this.activeColor = '#000';
  }

  enable () {
    this.context.strokeStyle = this.activeColor;
    this.context.lineJoin = "round";
    this.context.lineWidth = 7;
  }

  setContext (context) {
    this.context = context;
    this.context.lineJoin = "round";
    this.context.lineWidth = 7;
  }

  setColor (color) {
    this.context.strokeStyle = color;
  }

  onMouseDown (event) {
    this.drawing = event.button == 0;
    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onMouseMove (event) {
    if (this.drawing) {
      this.context.beginPath();

      this.context.moveTo(this.lastX, this.lastY);
      this.context.lineTo(event.clientX, event.clientY);
      this.context.closePath();
      this.context.stroke();
    }

    this.lastX = event.clientX;
    this.lastY = event.clientY;
  }

  onMouseUp () {
    this.drawing = false;
  }

  onKeyPress () {}

  onStateChange (state, value) {

    switch (state) {

      case CHANGE_ACTIVE_COLOR:
          this.activeColor = value;
          this.context.strokeStyle = this.activeColor;
        break;

    }

  }

}

export default Pen
