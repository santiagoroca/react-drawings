class Pen {

  constructor (context) {
    this.context = context;
    this.lastX = 0;
    this.lastY = 0;
    this.drawing = false;
  }

  onMouseDown (event) {
    this.drawing = event.which == 0;
    this.lastX = event.layerX;
    this.lastY = event.layerY;
  }

  onMouseMove (event) {
    console.log(event);
    if (this.drawing) {
      this.context.beginPath();
      this.context.strokeStyle = this.stroke;
      this.context.lineJoin = "round";
      this.context.lineWidth = 5;
      this.context.moveTo(this.lastX, this.lastY);
      this.context.lineTo(event.layerX, event.layerY);
      this.context.closePath();
      this.context.stroke();
    }

    this.lastX = event.layerX;
    this.lastY = event.layerY;
  }

  onMouseUp () {
    this.drawing = false;
  }

  onStateChange () {}

}

export default Pen
