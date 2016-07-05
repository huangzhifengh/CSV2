import React, { Component } from 'react';
import DataTableBase from '../Base'
import TableBody from './TableBody'
import styles from './HierarchyTable.css'
import withStyles from 'with-style';

@withStyles(styles)
class TreeTable extends DataTableBase {

  _getTableBody (columns, command, data) {
    return <TableBody columns={columns} command={command} data={this.state.data} onTableRowClick={::this.onCommandClick} />
  }

  render() {
    return this._getTable()
  }

}

export default TreeTable

