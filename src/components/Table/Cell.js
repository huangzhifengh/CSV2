import React, { Component, PropTypes } from 'react'

class Cell extends Component {

  render () {
    return <td {...this.props}>{this.props.children}</td>
  }

}

export default Cell
