import React, { Component } from 'react'
import MasterTableRow from './MasterTableRow'
import SubTableRow from './SubTableRow'

class TableBody extends Component {
  
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    command: React.PropTypes.array,
    onTableRowClick: React.PropTypes.func
  }

  static defaultProps = {
    data: [],
    columns: [],
    command: []
  }

  getTableRow () {
    let row = []
    let data = this.props.data


    if (data.length) {
      let props = {
        columns: this.props.columns,
        command: this.props.command,
        onTableRowClick: this.props.onTableRowClick
      }

      data.map(item => {
        let hasSub = item.children && item.children.length
        props.data = item
        props.key = item.id || Math.random()
        props.level = this.props.level ? (this.props.level + 1) : 1
        row.push(<MasterTableRow {...props} hasSub={hasSub} />)

        if (hasSub) {
          props.data = item.children
          props.key += '$sub'
          row.push(<SubTableRow {...props} id={item.id}/>)
        }
      })
    }

    return row
  }

  render() {
    let TRs = this.getTableRow()

    return (
      <tbody>
        {TRs}
        {!TRs.length && <tr className="data-table-empty-row"></tr>}
      </tbody>
    )
  }

}

export default TableBody

