import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/resources/treetable',
        create: '/api/resources/add',
        update: '/api/resources/edit',
        destroy: '/api/resources/del',
      },
    })

    return {
      title: '菜单管理',
      columns: [
        {title:'名称',name:'operationName'},
        {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'text',data:'/api/resources/tree?resourcesType=ALL',columnHidden:true},
        {title:'URL',name:'operationUrl'},
        {title:'图标',name:'bk2'},
        {title:'排序',name:'operationSeq'},
        {command:[{name:'create'},{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]},
      ],
      toolbar: [{name: 'create',text: '新增'}],
      dataSource: dataSource,
      detailInit: data => {
        return {
          columns: [
            {title:'名称',name:'operationName'},
            {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'text',data:'/api/resources/tree?resourcesType=ALL',columnHidden:true},
            {title:'URL',name:'operationUrl'},
            {title:'图标',name:'bk2'},
            {title:'排序',name:'operationSeq'},
            {command:[{name:'create'},{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]},
          ],
          dataSource: {
            data: data.children,
            transport: {
              create: '/api/resources/add',
              update: '/api/resources/edit',
              destroy: data => ({
                url: '/api/resources/del',
                data: {
                  ids: data.id
                }
              }),
            },
            requestEnd: (type, resp) => {
              if ('read' !== type && resp) {
                dataSource.sync()
              }
            }
          },
          autoRead: false,
        }
      },
      checkable: false,
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
