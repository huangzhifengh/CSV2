import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'
import Moment from '../../../utils/CustomMoment'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-监测类'
    this.state1 = {
      tableConfig: {
        panelTitle: {
          title: '温湿度',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name'
        }, {
          title: '区域',
          name: 'location',
          parse: (value, data) => {
            let show = '';
            if(data.location1){
              show = data.location1
              if(data.location2){
                show += ' ' + data.location2
                if(data.location3){
                  show += ' ' + data.location3
                }
              }
            }
            return show
          }
        }, {
          title: '当前温度(℃)',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.currentValueT
            }
            return show
          }
        }, {
          title: '当前湿度(%)',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.currentValueH
            }
            return show
          }
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            if(data.deviceStatu){//EBSEnough高，EBSLow低
              if('EBSLow' == data.deviceStatu.batteryState){
                show = '低'
              }
            }
            return show
          }
        }, {
          title: '剩余电量(%)',
          name: '',
          parse: (value, data) => {
            let show = '99';
            if(data.deviceStatu){
              show = '99'
            }
            return show
          }
        }, {
          title: '上报时间',
          name: '',
          parse: (value, data) => {
            let ct = data.deviceStatu.currentTime
            let show = ct?ct:data.currentTime
            return show
          }
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=103101',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick.bind(this)
        }
      }
    }

    this.state2 = {
      tableConfig: {
        panelTitle: {
          title: 'PM2.5',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name'
        }, {
          title: '区域',
          name: 'location',
          parse: (value, data) => {
            let show = '';
            if(data.location1){
              show = data.location1
              if(data.location2){
                show += ' ' + data.location2
                if(data.location3){
                  show += ' ' + data.location3
                }
              }
            }
            return show
          }
        }, {
          title: '当前指数(g/m³)',
          name: ''
        }, {
          title: '电池状态',
          name: ''
        }, {
          title: '剩余电量(%)',
          name: ''
        }, {
          title: '上报时间',
          name: ''
        }/*, {
          command: [{
            name: 'recount',
            text: '重置'
          }]
        }*/],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=103102',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick.bind(this)
        }
      }
    }

    this.state3 = {
      tableConfig: {
        panelTitle: {
          title: '甲醛',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name'
        }, {
          title: '区域',
          name: 'location',
          parse: (value, data) => {
            let show = '';
            if(data.location1){
              show = data.location1
              if(data.location2){
                show += ' ' + data.location2
                if(data.location3){
                  show += ' ' + data.location3
                }
              }
            }
            return show
          }
        }, {
          title: '当前指数(g/m³)',
          name: ''
        }, {
          title: '电池状态',
          name: ''
        }, {
          title: '剩余电量(%)',
          name: ''
        }, {
          title: '上报时间',
          name: ''
        }/*, {
          command: [{
            name: 'recount',
            text: '重置'
          }]
        }*/],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=103104',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick.bind(this)
        }
      }
    }

    this.state4 = {
      tableConfig: {
        panelTitle: {
          title: '噪音',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name'
        }, {
          title: '区域',
          name: 'location',
          parse: (value, data) => {
            let show = '';
            if(data.location1){
              show = data.location1
              if(data.location2){
                show += ' ' + data.location2
                if(data.location3){
                  show += ' ' + data.location3
                }
              }
            }
            return show
          }
        }, {
          title: '当前分贝',
          name: ''
        }, {
          title: '电池状态',
          name: ''
        }, {
          title: '剩余电量(%)',
          name: ''
        }, {
          title: '上报时间',
          name: ''
        }/*, {
          command: [{
            name: 'recount',
            text: '重置'
          }]
        }*/],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=103105',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick.bind(this)
        }
      }
    }

    this.state5 = {
      tableConfig: {
        panelTitle: {
          title: '光感',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name'
        }, {
          title: '区域',
          name: 'location',
          parse: (value, data) => {
            let show = '';
            if(data.location1){
              show = data.location1
              if(data.location2){
                show += ' ' + data.location2
                if(data.location3){
                  show += ' ' + data.location3
                }
              }
            }
            return show
          }
        }, {
          title: '当前亮度',
          name: ''
        }, {
          title: '电池状态',
          name: ''
        }, {
          title: '剩余电量(%)',
          name: ''
        }, {
          title: '上报时间',
          name: ''
        }/*, {
          command: [{
            name: 'recount',
            text: '重置'
          }]
        }*/],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=103103',
            parse: () => {}
          }
        },
        events: {
          onCommandClick: this._onCommandClick.bind(this)
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
        <DataTable config={this.state5.tableConfig} />
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
