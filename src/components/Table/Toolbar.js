import React, { Component, PropTypes } from 'react'

class Toolbar extends Component {

  render () {
    return <div className="toolbar">
    {this.props.buttons.map((item, index) => {
      return <a key={index} className="btn btn-default btn-sm" onClick={this.props.onClick.bind(this, item, null)}>
        {item.icon && <span className={`glyphicon glyphicon-${item.icon}`}></span>}
        {item.text}
      </a>
    })}</div>
  }

}

export default Toolbar

