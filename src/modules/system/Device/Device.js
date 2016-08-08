import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig1 () {
    let dataSource = new DataSource({transport:{
      read:'/api/dervices/list',
      create: '/api/dervices/add',
      update: '/api/dervices/edit',
      destroy: '/api/dervices/del'
    }});
    
    return {
      dataSource: dataSource,
      title: '设备管理',
      pagination: {show:true,pageSize:10},
      checkable: false,
      toolbar: [{name: 'create',text: '新增'}],
      columns: [
        {title:'设备名称',name:'name'},
        {title:'设备MAC',name:'macAdd'},
        {title:'应用类型',name:'devicesTypeId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/dervicesType/tree',columnHidden:true},
        {title:'硬件类型',name:'hardwareType',type:'select',valueField:'id',labelField:'name',columnHidden:true,
          data:[
            {id:'0',name:'灯'},
            {id:'1',name:'温湿度'},
            {id:'2',name:'烟感'},
            {id:'3',name:'水位传感器'},
            {id:'4',name:'人体热释传感器 '},
            {id:'5',name:'门磁 '},
            {id:'6',name:'声光报警器 '},
            {id:'7',name:'计量插座 '},
            {id:'8',name:'开关面板'},
            {id:'9',name:'水表'},
            {id:'10',name:'电表'},
            {id:'11',name:'光感'}
          ]
        },
        {title:'回路',name:'circuit',value:1},
        {title:'位置',name:'locationId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/location/tree',columnHidden:true},
        {title:'一级域',name:'location1',createHidden:true,editHidden:true},
        {title:'二级域',name:'location2',createHidden:true,editHidden:true},
        {title:'三级域',name:'location3',createHidden:true,editHidden:true},
        {title:'描述',name:'des'},
        {
          command:[
            {name: 'focus',type: 'heartBtn',text: '关注',
              click: (data,e) => {
                data.focus = e.target.checked;
                ajax({
                  url: '/api/dervices/edit',
                  data: data,
                  success: resp => {
                    if (resp && 0 === resp.code) {
                      dataSource.sync(data);
                      //alert("成功");
                    } else {
                      alert("失败");
                    }
                  }
                })
              }
            },
            //{name:'focus',text:'关注',type:'heartBtn',valueField:'focus'},
            {name:'update',text:'编辑'},
            {name:'destroy',text:'删除'},
          ]
        }
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
