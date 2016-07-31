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
      }
    })

    return {
      title: '应用类型',
      checkable: false,
      toolbar: [{name: 'create',text: '新增'}],
      dataSource: dataSource,
      columns: [
        {title:'名称',name:'name'},
        {title:'应用类型',name:'code',columnHidden:true},
        {title:'设备编号',name:'allCode',columnHidden:true},
        {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/dervicesType/tree',columnHidden:true,},
        {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
      ],
      detailInit: data => {
        return {
          autoRead: false,
          columns: [
            {title:'名称',name:'name'},
            {title:'应用类型',name:'code'},
            {title:'设备编号',name:'allCode',columnHidden:true},
            {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/dervicesType/tree',columnHidden:true},
            {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
          ],
          dataSource: {
            data: data.children,
            transport: {
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
          detailInit: data => {
            return {
              autoRead: false,
              columns: [
                {title:'名称',name:'name'},
                {title:'应用类型',name:'code',columnHidden:true},
                {title:'设备编号',name:'allCode'},
                {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/dervicesType/tree',columnHidden:true},
                {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
              ],
              dataSource: {
                data: data.children,
                transport: {
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
              }
            }
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
