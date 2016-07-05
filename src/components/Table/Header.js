import React, { Component, PropTypes } from 'react'

class Header extends Component {

  render () {
    return <thead>
      <tr>
        {this.props.detailInit && <th></th>}
        {this.props.checkable && <th><input type="checkbox" /></th>}
        {this.props.columns.map((item, index) => {
          return !item.columnHidden && <th className="data-table-th" key={index}>{item.title}</th>
        })}
        {!!this.props.command.length && <th className="data-table-th">操作</th>}
      </tr>
    </thead>
  }

}

export default Header
