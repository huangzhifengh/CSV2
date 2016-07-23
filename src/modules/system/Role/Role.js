import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig () {
    return {
      dataSource: new DataSource({transport:{
        read:'/api/role/list',
        /*detail: data => ({
          url: '/api/role/findById',
          data: {
            id: data.id
          }
        }),*/
        create: '/api/role/add',
        update: '/api/role/edit',
        destroy: '/api/role/del'
      }}),
      title: '角色管理',
      pagination: {show:true,pageSize:10},
      checkable: false,
      toolbar: [{name: 'create',text: '新增'}],
      columns: [
        {title:'角色名称',name:'roleName'},
        {title:'角色描述',name:'roleDesc'},
        {
          command: [
            {name:'update',text:'编辑'},
            {name:'destroy',text:'删除'},
            {name:'resConfig',text:'资源配置',click:(data)=>{window.location.href='#role/resconf/id='+data.id}}
          ]
        }
      ]
    }
  }

  render() {
    return this.props.children || (
      <div className="container-fluid">
        <Table {...this.getConfig()} />
      </div>
    )
  }

}

module.exports = Module
