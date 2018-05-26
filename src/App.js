import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Compoents
import Toolbar from './components/Toolbar'

// State's Handlers
import PenState from './modes/Pen.js'

// State Matchine's states
const PEN = 0;

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      mode: PEN
    }

    this.states = [
      new PenState()
    ]

    this.canvasRef = React.createRef();
  }

  render() {
    return (
      <div>
        <canvas
           key={1}
           onMouseDown={event => this.states[this.state.mode].onMouseDown(event)}
           onMouseMove={event => this.states[this.state.mode].onMouseMove(event)}
           onMouseUp={event => this.states[this.state.mode].onMouseUp(event)}
        ></canvas>
        <Toolbar/>
      </div>
    )
  }

  componendDidMount () {
    this.context = this.canvasRef.getContext('2d');
  }

}

export default App;
