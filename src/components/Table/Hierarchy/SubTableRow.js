import React, { Component } from 'react'
import TableBody from './TableBody'

class TableRow extends Component {
  
  static propTypes = {
    id: React.PropTypes.string,
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    command: React.PropTypes.array,
    onTableRowClick: React.PropTypes.func
  }

  static defaultProps = {
    data: {},
    columns: [],
    command: {}
  }

  render() {
    let data = this.props.data
    let {id, ...other} = this.props

    return (
      <tr className='sub-row'>
        <td className="sub-table-container" colSpan={this.props.columns.length}>
          <div className="sub-table-wrapper" data-id={this.props.id}>
            <table className="table sub-table table-hover">
            <TableBody {...other} />
            </table>
          </div>
        </td>
      </tr>
    )
  }

}

export default TableRow

