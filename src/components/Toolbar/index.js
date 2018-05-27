import React, { Component } from 'react';
import './Style.css';

// components
import PenItem from '../PenItem'
import ToolbarItem from '../ToolbarItem'

class Toolbar extends Component {

  constructor (props) {
    super(props);

    this.state = {
      active: 0,
      dragging: false,
      left: 10,
      top: 10
    }

    document.addEventListener('mousemove', event => this.onMouseMove(event))
    document.addEventListener('mouseup', event => this.onMouseUp(event))
  }

  componentWillReceiveProps (props) {
    this.setState({
      active: props.active
    })
  }

  onMouseDown (event) {
    this.setState ({
      dragging: true
    })
  }

  onMouseMove (event) {
    return;

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
          <ToolbarItem icon="ellipsis-h" color="#e4e4e4"/>
        </div>

        <div className="divisor"><div></div></div>

        <div className="toolbar-inner-wrapper">
          <PenItem
            active={this.state.active == 0}
            onStateChange={this.props.onStateChange}
            onClick={() => this.props.onModeChange(0)}/>

          <ToolbarItem
            active={this.state.active == 1}
            icon="eraser"
            onClick={() => this.props.onModeChange(1)}/>

          <ToolbarItem
            active={this.state.active == 2}
            icon="font"
            onClick={() => this.props.onModeChange(2)}/>

        </div>
      </div>
    )
  }

}

export default Toolbar;
