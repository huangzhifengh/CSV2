import React from 'react'
import Page from 'base-page'
import TreeLikeUI from 'components/TreeLikeUI'
import DataSource from 'components/DataSource'

class Module extends Page {

  componentDidMount (){
    
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">角色管理-资源配置</div>
          <div id='resConfig'>
            <TreeLikeUI data={'/api/role/resconf?id='+this.props.params.id} type='tree' checkable={true} checkStatusField="checked" nolink={true} />
          </div>
          <button id="resConf" type="button" className="btn btn-default btn-sm" onClick={this._onSubmit.bind(this)}>提交</button>
        </div>
      </div>
    )
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

}

module.exports = Module
