import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-空调'
    this.state = {
      tableConfig: {
        panelTitle: {
          title: '空调',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name',
        }, {
          title: '区域',
          name: 'location'
        }, {
          title: '开/关',
          name: ''
        }, {
          title: '模式',
          name: ''
        }, {
          title: '当前温度',
          name: ''
        }, {
          title: '当前风速',
          name: ''
        }, {
          title: '开机时间',
          name: ''
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=111111',
            parse: () => {}
          }
        }
      }
    }
  }

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  }

  render() {
    this.context.onSetTitle(this.tabTitle)

    return (
      <div className="container-fluid">
        <DataTable config={this.state.tableConfig} />
      </div>
    )
  }

}

export default Module
