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
          <div id='resConfig' className="panel-body">
            <TreeLikeUI data={'/api/role/resconf?id='+this.props.params.id} type='tree' checkable={true} checkStatusField="checked" nolink={true} />
            <button id="resConf" type="button" className="btn btn-info btn-sm" onClick={this._onSubmit.bind(this,this.props.params.id)}>提交</button>
          </div>
        </div>
      </div>
    )
  }

  _onSubmit (id) {
    let data = {id: id};
    let _resourcesIds = [];
    $('#resConfig .tree-node-ckb:checked').each(function(i,e){
      _resourcesIds.push($(e).attr('data-id'))
    })
    if(_resourcesIds.length>0){
      data.resourcesIds=_resourcesIds.join(',')
    }

    return ajax({
      url: '/api/role/resconf/edit',
      data: data,
      success: resp => {
        if (resp && 0 === resp.code) {
          alert("成功");
          window.location.href = '#role'
        } else {
          alert("失败："+resp.name)
        }
      }
    })
  }

}

module.exports = Module
