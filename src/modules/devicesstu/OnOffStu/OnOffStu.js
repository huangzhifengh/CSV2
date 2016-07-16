import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-开关类'
    this.state1 = {
      tableConfig: {
        panelTitle: {
          title: '开关',
          toolbar: {}
        },
        columns: [{
          title: '设备名称',
          name: 'name'
        }, {
          title: '回路',
          name: 'circuit'
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
          title: '上报时间',
          name: '',
          parse: (value, data) => {
            let ct = data.deviceStatu.currentTime
            let show = ct?ct:data.currentTime
            return show
          }
        }, /*{
          title: '开/关',
          name: '',
          parse: (value, data) => {
            let show = '关';
            if(data.deviceStatu){
              show = '关'
            }
            return show
          }
        }, */{
          command: [{
            title: '开关',
            name: 'onoff',
            type: 'switch'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=102101,102102,102103',
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
      </div>
    )
  }

  _devicesOperReq (p) {
    ajax({
      url: '/api/devices/oper/'+p.api+'?terminal='+p.terminal+'&mac='+p.mac,
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
    if ('onoff' === type) {
      //console.log(type, data, e)
      //SetLightOn: 开灯, SetLightOff: 关灯
      this._devicesOperReq({api: 'SetLightOn',terminal: 'pc',mac: data.macAdd})
      return false
    }
  }

}

export default Module
