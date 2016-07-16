import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-摄像头'
    this.state = {
      tableConfig: {
        panelTitle: {
          title: '摄像头',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name',
        }, {
          title: '区域',
          name: 'location'
        }, {
          title: '拍照',
          name: ''
        }, {
          title: '实时查看',
          name: ''
        }, {
          title: '旋转',
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
