import React, { Component } from 'react';
import logo from './logo.svg';
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
    alert("D");
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
           onKeyPress={event => console.log("VE")}
        ></canvas>
        <Toolbar
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
  }

}

export default App;
