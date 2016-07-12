import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/role/list',
        detail: data => ({
          url: '/api/role/findById',
          data: {
            id: data.id
          }
        }),
        create: '/api/role/add',
        update: '/api/role/edit',
        destroy: '/api/role/del'
      },
    })

    return {
      panelTitle: {
        title: '系统配置-角色管理',
        toolbar: {}
      },
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
          text: '资源配置'
        }]
      }],
      toolbar: [{
        name: 'create',
        text: '新增',
      }],
      dataSource: dataSource,
      checkable: false,
      editMode: 'remote',
      events: {
        onModalBodyInit: this._onModalBodyInit.bind(this),
        onSubmit: this._onSubmit.bind(this)
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

  _onModalBodyInit (type, data) {
    if (type === 'resConfig'){
      return (
        <div className="row">
          <div className="col-sm-offset-3 col-sm-6">
            <div id='resConfig'>
              <TreeLikeUI data={'/api/resources/tree?resourcesType=ALL'} type='tree' checkable={true} nolink={true} onUpdated={this._setDefaultChecked.bind(this, data)}/>
            </div>
          </div>
        </div>
      )
    }
  }

  _onSubmit (type, data, callback) {
    if('resConfig'===type){
      let _resourcesIds = [];
      $('#resConfig .tree-node-ckb:checked').each(function(i,e){
        _resourcesIds.push($(e).attr('data-id'))
      })
      if(_resourcesIds.length>0){
        data.json.resourcesIds=_resourcesIds.join(',')
      }
      return ajax({
        url: '/api/role/edit',
        data: data.json,
        success: resp => {
          if (resp && 0 === resp.code) {
            callback(true)
          } else {
            callback(false)
          }
        }
      })
    }
  }

  _setDefaultChecked (data) {
    ajax({
      url: `/api/role/findById?id=${data.id}`,
      success: resp => {
        if (resp && 0 === resp.code) {
          let resourcesIds = resp.data.resourcesIds
          $.each(resourcesIds, (i, e) => {
            $('#resConfig .tree-node-ckb[data-id=' + e + ']').prop('checked', true)
          })
        }
      }
    })
  }

}

module.exports = Module
