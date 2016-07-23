import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/dervicesType/tree',
        create: '/api/dervicesType/add',
        update: '/api/dervicesType/edit',
        destroy: '/api/dervicesType/del',
        requestStart: (type, data) => {
          return true;
        } 
      },
    })

    return {
      title: '设备类型',
      columns: [
        {title:'名称',name:'name'},
        {title:'代码',name:'code'},
        {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/dervicesType/tree',columnHidden:true,},
        {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
      ],
      toolbar: [{name: 'create',text: '新增'}],
      dataSource: dataSource,
      detailInit: data => {
        return {
          columns: [
            {title:'名称',name:'name'},
            {title:'代码',name:'code'},
            {title:'全码',name:'allCode',createHidden:true,editHidden:true},
            {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/dervicesType/tree',columnHidden:true},
            {title:'描述',name:'des'},
            {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
          ],
          dataSource: {
            data: data.children,
            transport: {
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
