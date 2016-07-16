import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-感应类'
    this.state1 = {
      tableConfig: {
        panelTitle: {
          title: '烟感',
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
          title: '设备状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
            if(data.deviceStatu){
              if('EDSSNormal' == data.deviceStatu.devSelfStatus){
                show = '正常'
              }
              if('EDSSWarning' == data.deviceStatu.devSelfStatus){
                show = '告警'
              }
              if('EDSSMalfunctioned' == data.deviceStatu.devSelfStatus){
                show = '设备故障'
              }
            }
            return show
          }
        }, {
          title: '烟雾检测',
          name: '',
          parse: (value, data) => {
            let show = '无烟雾'
            if(data.deviceStatu){
              if('ECSChecked' == data.deviceStatu.checkStatus){
                show = '有烟雾'
              }
              if('ECSUnChecked' == data.deviceStatu.checkStatus){
                show = '无烟雾'
              }
            }
            return show
          }
        }, {
          title: '烟雾类型',
          name: '',
          parse: (value, data) => {
            let show = '无'
            if(data.deviceStatu){
              if('ESTSmog' == data.deviceStatu.smogType){
                show = '烟雾'
              }
              if('ESTCo' == data.deviceStatu.smogType){
                show = '一氧化碳'
              }
              if('ESTCoo' == data.deviceStatu.smogType){
                show = '二氧化碳'
              }
              if('ESTCo' == data.deviceStatu.smogType){
                show = '一氧化碳'
              }
              if('ESTCoo' == data.deviceStatu.smogType){
                show = '天燃气'
              }
            }
            return show
          }
        }, {
          title: '防拆开关状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
            if(data.deviceStatu){
              if('ETSNormal' == data.deviceStatu.tamperStatus){
                show = '正常'
              }
              if('ETSException' == data.deviceStatu.tamperStatus){
                show = '异常'
              }
            }
            return show
          }
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
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
            let show = '99'
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
            url: '/api/devices/statu/list?subType=104101',
            parse: () => {}
          }
        }
      }
    }

    this.state2 = {
      tableConfig: {
        panelTitle: {
          title: '人体热释',
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
          title: '感应状态',
          name: '',
          parse: (value, data) => {
            let show = '未检测到'
            if(data.deviceStatu){
              if(1 == data.deviceStatu.PIRStatus){
                show = '检测到'
              }
            }
            return show
          }
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
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
            let show = '99'
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
            url: '/api/devices/statu/list?subType=104102',
            parse: () => {}
          }
        }
      }
    }

    this.state3 = {
      tableConfig: {
        panelTitle: {
          title: '红外',
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
          title: '感应状态',
          name: ''
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
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
            let show = '99'
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
            url: '/api/devices/statu/list?subType=104103',
            parse: () => {}
          }
        }
      }
    }

    this.state4 = {
      tableConfig: {
        panelTitle: {
          title: '水浸',
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
          title: '感应状态',
          name: '',
          parse: (value, data) => {
            let show = '未检测到'
            if(data.deviceStatu){
              if(1 == data.deviceStatu.waterSensorStatus){
                show = '检测到'
              }
            }
            return show
          }
        }, {
          title: '电池状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
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
            let show = '99'
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
            url: '/api/devices/statu/list?subType=104104',
            parse: () => {}
          }
        }
      }
    }

    this.state5 = {
      tableConfig: {
        panelTitle: {
          title: '声光报警',
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
          title: '设备状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
            if(data.deviceStatu){
              if('EDSSNormal' == data.deviceStatu.devSelfStatus){
                show = '正常'
              }
              if('EDSSWarning' == data.deviceStatu.devSelfStatus){
                show = '告警'
              }
              if('EDSSMalfunctioned' == data.deviceStatu.devSelfStatus){
                show = '设备故障'
              }
            }
            return show
          }
        }, {
          title: '声音告警',
          name: '',
          parse: (value, data) => {
            let show = '无'
            if(data.deviceStatu){
              if(data.deviceStatu.audibleSiren){
                show = '有'
              }
            }
            return show
          }
        }, {
          title: '红灯闪烁',
          name: '',
          parse: (value, data) => {
            let show = '无'
            if(data.deviceStatu){
              if(data.deviceStatu.visualStrobe){
                show = '有'
              }
            }
            return show
          }
        }, {
          title: '防拆开关状态',
          name: '',
          parse: (value, data) => {
            let show = '正常'
            if(data.deviceStatu){
              if('ETSNormal' == data.deviceStatu.tamperStatus){
                show = '正常'
              }
              if('ETSException' == data.deviceStatu.tamperStatus){
                show = '异常'
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
          title: '操作',
          command: [{
            name: 'ESTBurglar',
            text: '盗窃报警'
          }, {
            name: 'ESTFire',
            text: '火警'
          }, {
            name: 'ESTEmergency',
            text: '紧急事件'
          }, {
            name: 'ESTArmed',
            text: '布防'
          }, {
            name: 'ESTDisarmed',
            text: '撤防'
          }, {
            name: 'ESTStop',
            text: '停止'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=104105',
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
      url: '/api/devices/'+p.api+'?terminal='+p.terminal+'&mac='+p.mac+'&oper='+p.oper+'&visualStrobe=1&durSiren=5',
      data: {},
      success: resp => {
        if (resp && 0 === resp.code) {
          alert("成功");
        } else {
          alert("失败"+"："+resp.name);
        }
      }
    })
  }
  
  _onCommandClick (type, data, e) {
    console.log(type, data, e)
    this._devicesOperReq({api: 'SetSirenStatus',terminal: 'pc',mac: data.macAdd,oper: type})
    return false
  }

}

export default Module
