import React, { Component, PropTypes } from 'react'

class Header extends Component {

  toggleAllSelected (e) {
    $(e.target).closest('.table').find('.table-row-checkbox').prop('checked', e.target.checked)
  }

  render () {
    return <thead>
      <tr>
        {this.props.detailInit && <th className="data-table-th"></th>}
        {this.props.checkable && <th className="data-table-th"><input onClick={this.toggleAllSelected.bind(this)} className="table-header-checkbox check-all" type="checkbox" /></th>}
        {this.props.columns.map((item, index) => {
          return !item.columnHidden && <th className="data-table-th" key={index}>{item.title}</th>
        })}
        {!!this.props.command.length && <th className="data-table-th">操作</th>}
      </tr>
    </thead>
  }

}

export default Header
