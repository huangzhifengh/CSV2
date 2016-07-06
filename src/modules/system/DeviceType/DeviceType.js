import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'

class Module extends Page {

  getConfig () {
    return {
      panelTitle: {
        title: '系统配置-设备类型',
        toolbar: {}
      },
      columns: [{
        title: '名称',
        name: 'name'
      }, {
        title: '代码',
        name: 'code'
      }, {
        title: '上级节点',
        name: 'parentId',
        type: 'select',
        content: 'tree',
        key: 'id',
        value: 'name',
        data: '/api/dervicesType/tree',
        //hidden: true,
        columnHidden: true
      }, {
        title: '描述',
        name: 'des'
      }, {
        command: [{
          name: 'edit',
          text: '编辑'
        }, {
          name: 'delete',
          text: '删除'
        }]
      }],
      toolbar: [{
        name: 'create',
        text: 'add',
      }],
      dataSource: {
        transport: {
          read: '/api/dervicesType/tree',
          detail: data => ({
            url: '/api/dervicesType/findById',
            data: {
              id: data.id
            }
          }),
          create: '/api/dervicesType/add',
          update: '/api/dervicesType/edit',
          destroy: '/api/dervicesType/del'
        },
      },
      detailInit: data => {
        return {
          columns: [{
            title: '名称',
            name: 'name'
          }, {
            title: '代码',
            name: 'code'
          }, {
            title: '全码',
            name: 'allCode',
            createHidden: true,
            editHidden: true
          }, {
            title: '上级节点',
            name: 'parentId',
            type: 'select',
            content: 'tree',
            key: 'id',
            value: 'name',
            data: '/api/dervicesType/tree',
            //hidden: true,
            columnHidden: true
          }, {
            title: '描述',
            name: 'des'
          }, {
            command: [{
              name: 'edit',
              text: '编辑'
            }, {
              name: 'delete',
              text: '删除'
            }]
          }],
          dataSource: {
            data: data.children
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Table {...this.getConfig()} />
      </div>
    )
  }

}

module.exports = Module
