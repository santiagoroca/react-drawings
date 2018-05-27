class Eraser {

  constructor (context) {
    this.lastX = 0;
    this.lastY = 0;
    this.drawing = false;
  }

  enable () {
    this.context.strokeStyle = "#fff";
    this.context.lineJoin = "round";
    this.context.lineWidth = 20;
  }

  setContext (context) {
    this.context = context;
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

  }

}

export default Eraser
