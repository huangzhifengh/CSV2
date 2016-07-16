import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/role/list',
        /*detail: data => ({
          url: '/api/role/findById',
          data: {
            id: data.id
          }
        }),*/
        create: '/api/role/add',
        update: '/api/role/edit',
        destroy: '/api/role/del'
      },
    })

    return {
      title: '角色管理',
      pagination: {
        show: true,
        pageSize: 10
      },
      columns: [{
        title: '角色名称',
        name: 'roleName'
      }, {
        title: '角色描述',
        name: 'roleDesc'
      }/*, {
        title: '是否可用',
        name: 'roleStatus',
        type: 'boolean',
        parse: value => {
          return value ? '是' : '否'
        }
      }*/, {
        command: [{
          name: 'update',
          text: '编辑'
        }, {
          name: 'destroy',
          text: '删除'
        }, {
          name: 'resConfig',
          text: '资源配置',
          click: (data) => {
            console.log(data)
            window.location.href = "#role/resconf"
          }
        }]
      }],
      toolbar: [{
        name: 'create',
        text: '新增',
      }],
      dataSource: dataSource,
      checkable: false
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
