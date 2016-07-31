import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{
        read:'/api/gateway/list',
        create: '/api/gateway/add',
        update: '/api/gateway/edit',
        destroy: '/api/gateway/del'
      }}),
      title: '网关管理',
      pagination: {show:true,pageSize:10},
      checkable: false,
      toolbar: [{name: 'create',text: '新增'}],
      columns: [
        {title:'网关IP',name:'ip'},
        {title:'网关名称',name:'name'},
        {title:'位置',name:'locationId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/location/tree',columnHidden:true},
        {title:'一级域',name:'location1',createHidden:true,editHidden:true},
        {title:'二级域',name:'location2',createHidden:true,editHidden:true},
        {title:'三级域',name:'location3',createHidden:true,editHidden:true},
        {title:'网关MAC',name:'macAdd'},
        {title:'描述',name:'des'},
        {
          command:[
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
