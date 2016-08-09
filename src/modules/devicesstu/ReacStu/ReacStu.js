import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSourceWithSocket';

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=104101'}}),
      title: '烟感',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'设备状态',name:'',parse:(value,data)=>{let show='正常';if(data.deviceStatu){if('EDSSNormal'==data.deviceStatu.devSelfStatus){show='正常'}if('EDSSWarning'==data.deviceStatu.devSelfStatus){show='告警'}if('EDSSMalfunctioned'==data.deviceStatu.devSelfStatus){show='设备故障'}}return show}},
        {title:'烟雾检测',name:'',parse:(value,data)=>{let show='无烟雾';if(data.deviceStatu){if('ECSChecked'==data.deviceStatu.checkStatus){show='有烟雾'}if('ECSUnChecked'==data.deviceStatu.checkStatus){show='无烟雾'}}return show}},
        {title:'烟雾类型',name:'',parse:(value,data)=>{let show='无';if(data.deviceStatu){if('ESTSmog'==data.deviceStatu.smogType){show='烟雾'}if('ESTCo'==data.deviceStatu.smogType){show='一氧化碳'}if('ESTCoo'==data.deviceStatu.smogType){show='二氧化碳'}if('ESTCo'==data.deviceStatu.smogType){show='一氧化碳'}if('ESTCoo'==data.deviceStatu.smogType){show='天燃气'}}return show}},
        {title:'防拆开关状态',name:'',parse:(value,data)=>{let show='正常';if(data.deviceStatu){if('ETSNormal'==data.deviceStatu.tamperStatus){show='正常'}if('ETSException'==data.deviceStatu.tamperStatus){show='异常'}}return show}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig2 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=104102'}}),
      title: '人体热释',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'感应状态',name:'',parse:(value,data)=>{let show='未检测到';if(data.deviceStatu){if(1==data.deviceStatu.PIRStatus){show='检测到'}}return show}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig3 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=104103'}}),
      title: '红外',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'感应状态',name:'',parse:(value,data)=>{let show='未检测到';if(data.deviceStatu){if(1==data.deviceStatu.PIRStatus){show='检测到'}}return show}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig4 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=104104'}}),
      title: '水浸',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'感应状态',name:'',parse:(value,data)=>{let show='未检测到';if(data.deviceStatu){if(1==data.deviceStatu.waterSensorStatus){show='检测到'}}return show}},
        {title:'电池状态',name:'',parse:(value,data)=>{let show='正常';return show}},
        {title:'剩余电量(%)',name:'',parse:(value,data)=>{let show='99%';return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}}
      ]
    }
  }

  getConfig5 () {
    let dataSource = new DataSource({transport:{read:'/api/devices/statu/list?subType=104105'}});
    return {
      dataSource: dataSource,
      title: '声光报警',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'设备状态',name:'',parse:(value,data)=>{let show='正常';if(data.deviceStatu){if('EDSSNormal'==data.deviceStatu.devSelfStatus){show='正常'}if('EDSSWarning'==data.deviceStatu.devSelfStatus){show='告警'}if('EDSSMalfunctioned'==data.deviceStatu.devSelfStatus){show='设备故障'}}return show}},
        {title:'声音告警',name:'',parse:(value,data)=>{let show='无';if(data.deviceStatu){if(data.deviceStatu.audibleSiren){show='有'}}return show}},
        {title:'红灯闪烁',name:'',parse:(value,data)=>{let show='无';if(data.deviceStatu){if(data.deviceStatu.visualStrobe){show='有'}}return show}},
        {title:'防拆开关状态',name:'',parse:(value,data)=>{let show='正常';if(data.deviceStatu){if('ETSNormal'==data.deviceStatu.tamperStatus){show='正常'}if('ETSException'==data.deviceStatu.tamperStatus){show='异常'}}return show}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}},
        {command:[
          {name:'ESTBurglar',text:'盗窃报警',
            click: (data) => {
              data.jobStatu = 1;
              this.setStatu(data,'/api/job/edit',dataSource);
            }
          },
          {name:'ESTFire',text:'火警'},
          {name:'ESTEmergency',text:'紧急事件'},
          {name:'ESTArmed',text:'布防'},
          {name:'ESTDisarmed',text:'撤防'},
          {name:'ESTStop',text:'停止'}
        ]}
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
        <Table {...this.getConfig5()} />
      </div>
    )
  }

  setStatu () {
    alert("success")
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

module.exports = Module
