import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=108101'}}),
      title: '窗',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'状态',name:'windowStatus',parse:(value,data)=>{let show = '关';if(data.deviceStatu.doorStatus){show = '开'} return show}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}},
        //{command:[{title:'开关',name:'onoff',type:'switch'}]}
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

}

module.exports = Module
