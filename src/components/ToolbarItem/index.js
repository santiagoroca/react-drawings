import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import './Style.css';

class ToolbarItem extends Component {

  render() {

    let className = 'fa fa-';

    if (this.props.icon) {
        className += `${this.props.icon} `;
    }

    if (this.props.color) {
        className += `${this.props.color} `;
    }

    if (this.props.size) {
        className += `${this.props.size} `;
    }

    return (
      <div className="toolbar-icon-wrapper">
        <span
          className={className}
        />
      </div>
    )
  }

}

export default ToolbarItem;
