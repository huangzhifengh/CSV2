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
        valueField: 'id',
        labelField: 'name',
        data: '/api/dervicesType/tree',
        //hidden: true,
        columnHidden: true,
      }, {
        command: [{
          name: 'update',
          text: '编辑'
        }, {
          name: 'destroy',
          text: '删除'
        }]
      }],
      toolbar: [{
        name: 'create',
        text: '新增',
      }, {
        text: '其他'
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
            valueField: 'id',
            labelField: 'name',
            data: '/api/dervicesType/tree',
            //hidden: true,
            columnHidden: true
          }, {
            title: '描述',
            name: 'des'
          }, {
            command: [{
              name: 'update',
              text: '编辑'
            }, {
              name: 'destroy',
              text: '删除'
            }]
          }],
          dataSource: {
            data: data.children,
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
              destroy: data => ({
                url: '/api/dervicesType/del',
                data: {
                  id: data.id
                }
              }),
            },
          },
          autoRead: false,
        }
      },
      checkable: true,
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
