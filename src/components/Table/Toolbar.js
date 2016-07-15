import React, { Component, PropTypes } from 'react'

class Toolbar extends Component {

  render () {
    let { title, buttons } = this.props

    return (title || buttons.lenth ) ? <div className="toolbar">
    <a className="btn btn-link title">{title || 'Title'}</a>
    {buttons.map((item, index) => {
      return <a key={index} className="btn btn-default btn-sm" onClick={this.props.onClick.bind(this, item, null)}>
        {item.icon && <span className={`glyphicon glyphicon-${item.icon}`}></span>}
        {item.text}
      </a>
    })}</div> : <span />
  }

}

export default Toolbar

