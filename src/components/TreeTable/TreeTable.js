import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DataTableBase from '../DataTableBase'
import TableBody from './TableBody'
import style from './TreeTable.css'
import withStyles from 'with-style';

@withStyles(style)
class TreeTable extends DataTableBase {

  _getTableBody (columns, command, data) {
    return <TableBody columns={columns} command={command} data={this.state.data} onTableRowClick={this._onTableRowClick.bind(this)} />
  }

  render() {
    return this._getTable()
  }

}

export default TreeTable

