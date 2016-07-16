import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-窗'
    this.state = {
      tableConfig: {
        panelTitle: {
          title: '窗',
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
          name: 'aa'
        }, {
          title: '信号强度',
          name: 'ff'
        }, {
          title: '状态',
          name: 'statu'
        }, {
          command: [{
            name: 'onoff',
            text: '关'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=108101',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick.bind(this) 
        }
      }
    }

    this.substate = {
      tableConfig: {
        panelTitle: {
          title: '操作记录',
          toolbar: {}
        },
        columns: [{
          title: '时间',
          name: 'time'
        }, {
          title: '设备名称',
          name: 'deviceName',
        }, {
          title: '区域',
          name: 'location'
        }, {
          title: '操作',
          name: 'oper'
        }, {
          title: '设备状态',
          name: 'deviceStatu'
        }, {
          title: '操作人',
          name: 'operUser'
        }],
        transport: {
          read: {
            url: '/api/devices/operlog/list',
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
        <DataTable config={this.substate.tableConfig} />
      </div>
    )
  }

  _devicesOperReq (p) {
    ajax({
      url: '/api/devices/oper?terminal='+p.erminal+'&mac='+p.mac+'&oper='+p.oper,
      data: {},
      success: resp => {
        if (resp && 0 === resp.code) {
          alert("成功");
        } else {
          alert("失败");
        }
      }
    })
  }
 
  _onCommandClick (type, data, e) {
    if ('onoff' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }
}

export default Module
