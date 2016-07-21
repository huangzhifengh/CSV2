import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{read:'/api/devices/statu/list?subType=109101'}}),
      title: '摄像头',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'状态',name:'devSelfStatus',parse:(value,data)=>{return '正常'}},
        {title:'上报时间',name:'',parse:(value,data)=>{let ct=data.deviceStatu.currentTime;let show=ct?ct:data.currentTime;return show}},
        {command:[
          {name:'1',text:'拍照',
            click: (data) => {
              alert('暂时无法操作')
            }
          },
          {name:'2',text:'实时查看',
            click: (data) => {
              alert('暂时无法操作')
            }
          },
          {name:'3',text:'旋转',
            click: (data) => {
              alert('暂时无法操作')
            }
          },
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

}

module.exports = Module
