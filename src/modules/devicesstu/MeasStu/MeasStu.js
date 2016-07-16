import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-计量类'
    this.state1 = {
      tableConfig: {
        panelTitle: {
          title: '电表',
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
          title: '用电总量(KW/H)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.consumption
            }
            return show
          }
        }, {
          title: '当前功率(W)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.activePower
            }
            return show
          }
        }, {
          title: '当前电压(V)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.devV
            }
            return show
          }
        }, {
          title: '当前电流(A)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.devI
            }
            return show
          }
        }, {
          title: '漏电告警',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            if(data.deviceStatu){
              if(data.deviceStatu.leakage){
                show = '漏电'
              }
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
            url: '/api/devices/statu/list?subType=101102',
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
          title: '水表',
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
          title: '用水总量(m³)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.waterValue
            }
            return show
          }
        }, {
          title: '漏水告警',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            if(data.deviceStatu){
              if(data.deviceStatu.leakage){
                show = '漏水'
              }
            }
            return show
          }
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            return show
          }
        }, {
          title: '剩余电量(%)',
          name: '',
          parse: (value, data) => {
            let show = '99%';
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
            url: '/api/devices/statu/list?subType=101101',
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
          title: '燃气表',
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
          title: '燃气总量(m³)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.gasValue
            }
            return show
          }
        }, {
          title: '漏气告警',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            if(data.deviceStatu){
              if(data.deviceStatu.leakage){
                show = '漏水'
              }
            }
            return show
          }
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            return show
          }
        }, {
          title: '剩余电量(%)',
          name: '',
          parse: (value, data) => {
            let show = '99%';
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
            url: '/api/devices/statu/list?subType=101103',
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
          title: '计量插座',
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
        },/* {
          title: '开/关',
          name: '',
          parse: (value, data) => {
            let show = '关';
            if(data.deviceStatu){
              if('EDOSOn' == data.deviceStatu.devOnOff){
                show = '开'
              }
            }
            return show
          }
        },*/ {
          title: '用电总量(KW/H)',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.consumption
            }
            return show
          }
        }, {
          title: '当前功率(W)',
          name: '',
          parse: (value, data) => {
            let show = '0'
            if(data.deviceStatu){
              show = data.deviceStatu.activePower
            }
            return show
          }
        }, {
          title: '当前电压(V)',
          name: '',
          parse: (value, data) => {
            let show = '0'
            if(data.deviceStatu){
              show = data.deviceStatu.devV
            }
            return show
          }
        }, {
          title: '当前电流(A)',
          name: '',
          parse: (value, data) => {
            let show = '0'
            if(data.deviceStatu){
              show = data.deviceStatu.devI
            }
            return show
          }
        }, {
          title: '漏电告警',
          name: '',
          parse: (value, data) => {
            let show = '正常';
            if(data.deviceStatu){
              if(data.deviceStatu.leakage){
                show = '漏电'
              }
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
        }, {
          command: [{
            title: '开关',
            name: 'onoff',
            type: 'switch'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=101104',
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
    if ('recount' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }
}

export default Module
