import React, { Component } from 'react';

import { CirclePicker } from 'react-color'

// components
import ToolbarItem from '../ToolbarItem'

import './Style.css';

class PenItem extends Component {

  constructor (props) {
    super(props)

    this.state = {
      color: '#000'
    }
  }

  handleChangeComplete (color, event) {

    //
    this.props.onClick();

    this.setState({
      color: color.hex
    });

    // 0 stands for CHANGE_COLOR
    this.props.onStateChange(0, color.hex);
  }

  render() {
    return (
      <div>
        <ToolbarItem
            onClick={this.props.onClick}
            active={this.props.active}
            icon="eraser"
            hoverContent={
              <div></div>
            }/>
      </div>
    )
  }

}

export default PenItem;
