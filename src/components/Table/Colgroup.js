import React, { Component, PropTypes } from 'react'

class Colgroup extends Component {

  render () {
    return <colgroup>
      {this.props.detailInit && <col width="20px" />}
      {this.props.checkable && <col width="20px" />}
      {this.props.columns.map((column, index) => <col key={index} width={column.width} />)}
      {this.props.command && <col />}
    </colgroup>
  }

}

export default Colgroup
