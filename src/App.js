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
      canvasHeight: 0
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

    return (
      <div style={{height: '100%', width: '100%'}}>
        <canvas
           width={this.state.width}
           height={this.state.height}
           style={{height: '100%', width: '100%'}}
           ref={this.canvasRef}
           key={1}
           onMouseDown={event => this.onMouseDown(event)}
           onMouseMove={event => this.onMouseMove(event)}
           onMouseUp={event => this.onMouseUp(event)}
        ></canvas>
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

    if (this.props.onGetMediaStream) {
      this.props.onGetMediaStream(this.canvasRef.current.captureStream(25));
    }

    if (this.props.onGetContext2D) {
      this.props.onGetContext2D(this.context);
    }
  }

}

export default App
