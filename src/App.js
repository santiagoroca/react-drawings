import React, { Component } from 'react';
import './App.css';

// Compoents
import Toolbar from './components/Toolbar'

// State's Handlers
import PenState from './modes/Pen.js'
import EraserState from './modes/Eraser.js'
import TextState from './modes/Text.js'

// State Matchine's states
const PEN = 0;

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      mode: PEN,
      canvasWidth: 0,
      canvasHeight: 0,
      x: 0,
      y: 0
    }

    this.states = [
      new PenState(this.context),
      new EraserState(this.context),
      new TextState(this.context)
    ];

    this.canvasRef = React.createRef();
    document.addEventListener('keyup', event => this.onKeyPress(event))

    //
    this.canvasMemento = [];
  }

  save () {
    this.canvasMemento.push(this.canvasRef.current.getImageData(
      0,
      0,
      this.state.width,
      this.state.height
    ))
  }

  restore () {
    if (this.canvasMemento.length) {
      const imageData = this.canvasMemento[this.canvasMemento.length-1];
      this.canvasRef.current.putImageData(imageData);
      this.canvasMemento.splice(-1)
    }
  }

  onMouseDown (event) {
    const handler = this.states[this.state.mode];
    handler.onMouseDown.bind(handler)(event);
  }

  onMouseMove (event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    })

    const handler = this.states[this.state.mode];
    handler.onMouseMove.bind(handler)(event);
  }

  onMouseUp (event) {
    const handler = this.states[this.state.mode];
    handler.onMouseUp.bind(handler)(event);
  }

  onKeyPress (event) {
    const handler = this.states[this.state.mode];
    handler.onKeyPress.bind(handler)(event);
  }

  render() {

    let position = {}
    let cursor = '';

    switch (this.state.mode) {

      case 0:
        cursor = <i class="fas fa-pencil-alt"></i>
        position = {
          left: `${this.state.x}px`,
          top: `${this.state.y-15}px`
        }
        break;

      case 1:
        cursor = (
          <div className="eraser">
          </div>
        )
        position = {
          left: `${this.state.x-10}px`,
          top: `${this.state.y-10}px`
        }
        break;

      case 2:
        cursor = <i class="text-cursor fas fa-i-cursor"></i>
        position = {
          left: `${this.state.x}px`,
          top: `${this.state.y-50}px`
        }
        break;

      default:

    }

    return (
      <div style={{height: '100%', width: '100%', overflow: 'hidden'}}>
        <canvas
           width={this.state.width}
           height={this.state.height}
           style={{height: '100%', width: '100%', cursor: 'none'}}
           ref={this.canvasRef}
           key={1}
           onMouseDown={event => this.onMouseDown(event)}
           onMouseMove={event => this.onMouseMove(event)}
           onMouseUp={event => this.onMouseUp(event)}
        ></canvas>

        <div className="cursor-icon" style={position}>
          {cursor}
        </div>

        <Toolbar
          position={this.props.position || 'topright'}
          key={0}
          active={this.state.mode}
          onModeChange={mode => { this.setState({ mode }); this.states[mode].enable()} }
          onStateChange={(state, value) => this.states[this.state.mode].onStateChange(state, value)}
        />
      </div>
    )
  }

  componentDidUpdate () {
    if (this.props.onGetMediaStream) {
      this.props.onGetMediaStream(this.canvasRef.current.captureStream(25));
    }
  }

  componentDidMount () {
    this.context = this.canvasRef.current.getContext('2d');

    for (let handler of this.states) {
      handler.setContext(this.context);
    }

    const width = this.canvasRef.current.clientWidth;
    const height = this.canvasRef.current.clientHeight;

    this.setState({
      width, height
    })

    if (this.props.onGetContext2D) {
      this.props.onGetContext2D(this.context);
    }
  }

}

export default App
