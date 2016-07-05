import React , { Component } from 'react'
import Table from './Table'
import HierarchyTable from './Hierarchy/HierarchyTable'

class TableReducer extends Component {
  
  render () {
    let { hierarchy, ...other} = this.props
    return hierarchy ? <HierarchyTable {...other} /> : <Table {...other} />
  }

}

export default TableReducer
