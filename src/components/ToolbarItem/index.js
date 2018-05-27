import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome'
import './Style.css';

class ToolbarItem extends Component {

  render() {

    let styles = {}
    let className = 'toolbar-icon-hover fa fa-';

    if (this.props.icon) {
        className += `${this.props.icon} `;
    }

    if (this.props.active && this.props.color) {
      styles['color'] = `${this.props.color}`;
    }

    if (this.props.underlineColor) {
        styles['borderLeft'] = `3px solid ${this.props.underlineColor} `;
    }

    if (this.props.size) {
        className += `${this.props.size} `;
    }

    if (this.props.active) {
        className += `active `;
    }

    return (
      <div className="toolbar-icon-wrapper">
        <span
          onClick={this.props.onClick}
          className={className}
          style={styles}
        />
        {
            !!this.props.hoverContent && (
              <div className="toolbar-icon-hover-content">
                <div>
                  <div className="arrow-container"><div className="arrow"></div></div>
                  <span>
                    { this.props.hoverContent }
                  </span>
                </div>
              </div>
            )
        }
      </div>
    )
  }

}

export default ToolbarItem;
