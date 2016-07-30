import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/location/tree',
        create: '/api/location/add',
        update: '/api/location/edit',
        destroy: '/api/location/del',
        requestStart: (type, data) => {
          return true;
        } 
      }
    })

    return {
      title: '域管理',
      checkable: false,
      toolbar: [{name: 'create',text: '新增'}],
      dataSource: dataSource,
      columns: [
        {title:'名称',name:'name'},
        {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/location/tree',columnHidden:true,},
        {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
      ],
      detailInit: data => {
        return {
          autoRead: false,
          columns: [
            {title:'名称',name:'name'},
            {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/location/tree',columnHidden:true},
            {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
          ],
          dataSource: {
            data: data.children,
            transport: {
              detail: data => ({
                url: '/api/location/findById',
                data: {
                  id: data.id
                }
              }),
              create: '/api/location/add',
              update: '/api/location/edit',
              destroy: data => ({
                url: '/api/location/del',
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
                {title:'上级节点',name:'parentId',type:'select',content:'tree',valueField:'id',labelField:'name',data:'/api/location/tree',columnHidden:true},
                {command:[{name:'update',text:'编辑'},{name:'destroy',text:'删除'}]}
              ],
              dataSource: {
                data: data.children,
                transport: {
                  detail: data => ({
                    url: '/api/location/findById',
                    data: {
                      id: data.id
                    }
                  }),
                  create: '/api/location/add',
                  update: '/api/location/edit',
                  destroy: data => ({
                    url: '/api/location/del',
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
