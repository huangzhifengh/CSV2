import React, { PropTypes, Component } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'
import styles from './SpcStu.css';
import WithStyles from '../../../decorators/withStyles'

@WithStyles(styles)
class Module extends Component {
  constructor () {
    super()
    this.tabTitle = '特别关注'
    this.state1 = {
      tableConfig: {
        panelTitle: {
          title: '灯',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name',
        }, {
          title: '区域',
          name: 'location'
        }, {
          title: '当前电量',
          name: 'aa'
        }, {
          title: '日总电量',
          name: 'bb'
        }, {
          title: '月总电量',
          name: 'cc'
        }, {
          title: '电流值',
          name: 'dd'
        }, {
          title: '电压值',
          name: 'ee'
        }, {
          title: '信号强度',
          name: 'ff'
        }, {
          title: '状态',
          name: 'statu'
        }, {
          command: [{
            name: 'recount',
            text: '重置'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=111111&focus=true',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick1.bind(this)
        }
      }
    }

    this.state2 = {
      tableConfig: {
        panelTitle: {
          title: '开关',
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
            type: 'switch'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=111111&focus=true',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick2.bind(this)
        }
      }
    }

    this.state3 = {
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
          title: '当前值',
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
            text: '关',
            type: 'switch'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=111111&focus=true',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick3.bind(this)
        }
      }
    }

    this.state4 = {
      tableConfig: {
        panelTitle: {
          title: '计量插座',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name',
        }, {
          title: '区域',
          name: 'location'
        }, {
          title: '信号强度',
          name: 'ff'
        }, {
          title: '状态',
          name: 'statu'
        }, {
          command: [{
            name: 'onoff',
            text: '关',
            type: 'switch'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=111111&focus=true',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick4.bind(this)
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
          <DataTable config={this.state1.tableConfig} />
          <DataTable config={this.state2.tableConfig} />
          <DataTable config={this.state3.tableConfig} />
          <DataTable config={this.state4.tableConfig} />
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
 
  _onCommandClick1 (type, data, e) {
    if ('recount' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }

  _onCommandClick2 (type, data, e) {
    if ('onoff' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }
  
  _onCommandClick3 (type, data, e) {
    if ('onoff' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }
  
  _onCommandClick4 (type, data, e) {
    if ('onoff' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }
}

export default Module;
