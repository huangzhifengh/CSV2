import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'

class Module extends Page {
  constructor () {
    super()
    this.tabTitle = '系统配置-设备类型'
    this.state = {
      tableConfig: {
        panelTitle: {
          title: this.tabTitle,
          toolbar: {}
        },
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
            name: 'create'
          }, {
            name: 'edit',
            text: '编辑'
          }, {
            name: 'delete',
            text: '删除'
          }]
        }],
        transport: {
          read: {
            url: '/api/dervicesType/tree',
            parse: () => {}
          },
          detail: '/api/dervicesType/findById',
          create: '/api/dervicesType/add',
          update: {
            url: '/api/dervicesType/edit',
            format: () => {}
          },
          destroy: '/api/dervicesType/del'
        },
        editMode: 'remote'
      }
    }
  }

  static contextTypes = {
    //onSetTitle: PropTypes.func.isRequired
  }

  render() {
    //this.context.onSetTitle(this.tabTitle)

    return (
      <div className="container-fluid">
        <Table hierarchy {...this.state.tableConfig} />
      </div>
    )
  }

  _onSubmit (type, data, callback) {
    console.log(type,data,callback)
  }

}

module.exports = Module