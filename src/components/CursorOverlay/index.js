import React, { Component } from 'react';

import { CirclePicker } from 'react-color'

// components
import ToolbarItem from '../ToolbarItem'

import './Style.css';

class CursorOverlay extends Component {

  constructor (props) {
    super(props);

    this.state = {
      mode: props.mode,
      x: 0,
      y: 0
    }
  }

  componentWillReceiveProps (props) {
    if (props.mode) {
      this.state = {
        mode: props.mode
      }
    }
  }


  render() {
    const position = {
      left: `${this.state.x}px`,
      top: `${this.state.y-15}px`
    }

    let cursor = '';
    switch (this.state.mode) {

      case 0:
        cursor = <i class="fas fa-pencil-alt"></i>
        break;

      default:

    }

    return (
        <div className="cursor-icon" style={position}>
          {cursor}
        </div>
    )

  }

}

export default CursorOverlay
