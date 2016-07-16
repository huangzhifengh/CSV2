import React from 'react'
import Page from 'base-page'
import TreeLikeUI from 'components/TreeLikeUI'
import DataSource from 'components/DataSource'

class Module extends Page {

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">角色管理-资源配置</div>
          <TreeLikeUI data={'/api/resources/tree?resourcesType=ALL'} type='tree' checkable={true} nolink={true} />
          <button id="resConf" type="button" className="btn btn-default btn-sm" onClick={this._onSubmit.bind(this)}>提交</button>
        </div>
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
