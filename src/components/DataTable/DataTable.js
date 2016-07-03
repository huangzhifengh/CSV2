import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataTableBase from '../DataTableBase'
import TableRow from './TableRow'
import withStyles from 'with-style'
import styles from './DataTable.css'

@withStyles(styles)
class DataTable extends DataTableBase {

  _getTableBody (columns, command) {
    let data = this.state.data

    return (<tbody>
    {!!data.length && data.map((item, index) => {
      return <TableRow columns={columns} command={command} data={item} key={index} onClick={this._onTableRowClick.bind(this)} />
    })}
    {!data.length && <tr className="data-table-empty-row"></tr>}
    </tbody>)
  }

  render() {
    return this._getTable()
  }

}

export default DataTable;
