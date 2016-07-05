import React, { Component } from 'react';
import Base from './Base'
import Row from './Row'
import withStyles from 'with-style'
import styles from './Table.css'

@withStyles(styles)
class DataTable extends Base {

  getTableBody (columns, command, checkable) {
    let data = this.state.data

    return (<tbody>
    {!!data.length && data.map((item, index) => {
      return <Row 
        key={index} 
        columns={columns} 
        command={command} 
        checkable={checkable} 
        data={item} 
        onCommandClick={::this.onCommandClick} 
      />
    })}
    {!data.length && <tr className="data-table-empty-row">暂无数据</tr>}
    </tbody>)
  }

  render() {
    return this.getTable()
  }

}

export default DataTable;
