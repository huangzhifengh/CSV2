import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{
        read:'/api/user/list',
        create: '/api/user/add',
        update: '/api/user/edit',
        destroy: '/api/user/del'
      }}),
      title: '用户管理',
      pagination: {rows: 10},
      checkable: false,
      toolbar: [{name: 'create',text: '新增'}],
      columns: [
        {title:'登录名称',name:'userName'},
        {title:'真实姓名',name:'realName'},
        {title:'密码',name:'password',type:'password',columnHidden:true},
        {title:'手机号码',name:'phone'},
        {title:'邮箱',name:'email'},
        {title:'描述',name:'des'},
        {title:'角色',name:'roleIds',value:'roleDesc',type:'option',data:'/api/role/list',columnHidden:true},
        {
          command: [
            {name:'update',text:'编辑'},
            {name:'destroy',text:'删除'},
            //{name:'resConfig',text:'位置配置',click:(data)=>{window.location.href='#user/localconf/id='+data.id}}
          ]
        }
      ]
    }
  }

  render() {
    return this.props.children || (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
      </div>
    )
  }

}

module.exports = Module
