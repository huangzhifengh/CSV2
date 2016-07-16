import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-网关状态'
    this.state = {
      tableConfig: {
        panelTitle: {
          title: '网关状态',
          toolbar: {}
        },
        columns: [{
          title: '网关名称',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.gateWay){
              show = data.gateWay.name
            }
            return show
          }
        }, {
          title: '区域',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.gateWay){
              show = data.gateWay.location1
              if(data.gateWay.location2){
                show += '-' + data.gateWay.location2
                if(data.gateWay.location3){
                  show += '-' + data.gateWay.location3
                }
              }
            }
            return show
          }
        }, {
          title: 'IP',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.gatewayIp
            }
            return show
          }
        }, {
          title: '网关类型',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.gatewayType
            }
            return show
          }
        }, {
          title: '挂载设备数量',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              var i=0;
              for(var dev in data.deviceStatu.devList){
                i++;
              }
              show = i
            }
            return show
          }
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=111111',
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
          title: '挂载设备',
          toolbar: {}
        },
        columns: [{
          title: '网关名称',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.gateWay){
              show = data.gateWay.name
            }
            return show
          }
        }, {
          title: '区域',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.gateWay){
              show = data.gateWay.location1
              if(data.gateWay.location2){
                show += '-' + data.gateWay.location2
                if(data.gateWay.location3){
                  show += '-' + data.gateWay.location3
                }
              }
            }
            return show
          }
        }, {
          title: 'IP',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.ip
            }
            return show
          }
        }, {
          title: '网关类型',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.ip
            }
            return show
          }
        }, {
          title: '挂载设备数量',
          name: '',
          parse: (value, data) => {
            let show = '';
            if(data.deviceStatu){
              show = data.deviceStatu.ip
            }
            return show
          }
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
    if ('restart' === type) {
      console.log(type, data, e)
      this._devicesOperReq({terminal: 'pc',mac: data.id,oper:type})
      return false
    }
  }
}

export default Module
