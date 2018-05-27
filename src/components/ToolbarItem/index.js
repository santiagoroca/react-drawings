import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import './Style.css';

class ToolbarItem extends Component {

  render() {

    let styles = {}
    let className = 'fa fa-';

    if (this.props.icon) {
        className += `${this.props.icon} `;
    }

    if (this.props.color) {
        styles['color'] = `${this.props.color}`;
    }

    if (this.props.size) {
        className += `${this.props.size} `;
    }

    return (
      <div className="toolbar-icon-wrapper">
        <span
          className={className}
          style={styles}
        />
      </div>
    )
  }

}

export default ToolbarItem;
