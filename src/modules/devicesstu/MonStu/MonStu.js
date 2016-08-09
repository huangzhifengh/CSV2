import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSourceWithSocket';

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=103101'}}),
      title: '温湿度',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'当前温度(℃)',name:'currentValueT',parse:(value,data)=>{return data.deviceStatu.currentValueT}},
        {title:'当前湿度(%)',name:'currentValueH',parse:(value,data)=>{return data.deviceStatu.currentValueH}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig2 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=103102'}}),
      title: 'PM2.5',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'当前指数(g/m³)',name:'pmValue',parse:(value,data)=>{return data.deviceStatu.pmValue}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig3 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=103103'}}),
      title: '光感',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'当前亮度',name:'lightValue',parse:(value,data)=>{return data.deviceStatu.lightValue}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig4 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=103104'}}),
      title: '甲醛',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'当前指数(g/m³)',name:'formaldehydeValue',parse:(value,data)=>{return data.deviceStatu.formaldehydeValue}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig5 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=103105'}}),
      title: '噪音',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'当前分贝',name:'noiseValue',parse:(value,data)=>{return data.deviceStatu.noiseValue}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
        <Table {...this.getConfig2()} />
        <Table {...this.getConfig3()} />
        <Table {...this.getConfig4()} />
        <Table {...this.getConfig4()} />
      </div>
    )
  }

}

module.exports = Module
