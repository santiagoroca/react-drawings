import React, { Component } from 'react';
import './Style.css';

// components
import ToolbarItem from '../ToolbarItem'

class Toolbar extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dragging: false,
      left: 0,
      top: 0
    }

    document.addEventListener('mousemove', event => this.onMouseMove(event))
    document.addEventListener('mouseup', event => this.onMouseUp(event))
  }

  onMouseDown (event) {
    this.setState ({
      dragging: true
    })
  }

  onMouseMove (event) {
    console.log(event);
    if (this.state.dragging) {
      this.setState({
        left: event.clientX,
        top: event.clientY
      })
    }
  }

  onMouseUp (event) {
    this.setState ({
      dragging: false
    })
  }

  render() {

    const position = {
      left: `${this.state.left}px`,
      top: `${this.state.top}px`
    }

    return (
      <div style={position} className="toolbar-wrapper">

        <div className="drag-area"
          onMouseDown={event => this.onMouseDown(event)}>
          <ToolbarItem icon="ellipsis-h"/>
        </div>

        <div className="toolbar-inner-wrapper">
          <ToolbarItem icon="pencil-alt" size="x2"/>
        </div>
      </div>
    )
  }

}

export default Toolbar;
