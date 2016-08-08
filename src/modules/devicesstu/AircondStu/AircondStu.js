import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSourceWithSocket';

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=106101'}}),
      title: '空调',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'当前模式',name:'currentModel',parse:(value,data)=>{return data.deviceStatu.currentModel}},
        {title:'当前温度',name:'currentT',parse:(value,data)=>{return data.deviceStatu.currentT}},
        {title:'当前风速',name:'currentW',parse:(value,data)=>{return data.deviceStatu.currentW}},
        {title:'开机时间',name:''},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}},
        {command:[
          {title:'开关',name:'devOnOff',type:'switch',
            click: (data,e) => {
              this._setOnOff(data,e,dataSource);
            }
          }
        ]}
      ]
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
      </div>
    )
  }

  _setOnOff (data,e,dataSource) {
    alert("失败");
    return false;
    let api = "SetLightOff";
    if(!!e.target.checked){
      api = "SetLightOn";
    }
    ajax({
      url: '/api/devices/oper/'+api+'?id='+data.id,
      success: resp => {
        if (resp && 0 === resp.code) {
          //dataSource.sync(data);
          alert("成功");
        } else {
          alert("失败:"+resp.name);
        }
      }
    })
  }
}

module.exports = Module
