import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Base from './Base'
import Row from './Row'
import withStyles from 'with-style'
import styles from './Table.css'

@withStyles(styles)
class DataTable extends Base {

  _getTableBody (columns, command) {
    let data = this.state.data

    return (<tbody>
    {!!data.length && data.map((item, index) => {
      return <Row columns={columns} command={command} data={item} key={index} onClick={this._onRowClick.bind(this)} />
    })}
    {!data.length && <tr className="data-table-empty-row"></tr>}
    </tbody>)
  }

  render() {
    return this._getTable()
  }

}

export default DataTable;
