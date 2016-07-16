import React, { Component, PropTypes } from 'react'
import DataTable from '../../../components/DataTable'
import ajax from '../../../ajax'

class Module extends Component {

  constructor () {
    super()
    this.tabTitle = '设备状态-照明类'
    this.state = {
      tableConfig: {
        panelTitle: {
          title: '灯',
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
          title: '当前色温',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.currentColor
            }
            return show
          }
        }, {
          title: '当前亮度',
          name: '',
          parse: (value, data) => {
            let show = '0';
            if(data.deviceStatu){
              show = data.deviceStatu.currentLightness
            }
            return show
          }
        }, {
          title: '上报时间',
          name: '',
          parse: (value, data) => {
            let show = data.currentTime
            if(data.deviceStatu){
              show = data.deviceStatu.currentTime
            }
            return show
          }
        }, {
          title: '开/关',
          command: [{
            name: 'onoff',
            type: 'switch'
          }]
        }],
        transport: {
          read: {
            url: '/api/devices/statu/list?subType=105101',
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
        <DataTable config={this.state.tableConfig} />
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
      this._devicesOperReq({api: 'SetLightOff',terminal: 'pc',mac: data.macAdd})
      return false
    }
  }

}

export default Module
