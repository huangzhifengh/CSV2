import React from 'react'
import Page from 'base-page'
import SelectBox from 'components/Form/Elements/SelectBox'

class Module extends Page {

  render () {
    let props4 = {
	    type: "select", 
	    title: "烟感",
	    name: "smogId",
	    //value: "name",
      labelField: "name",
      valueField: "id",
	    data: "/api/link/ctrl/device?subType=104101"
    }
    let props5 = {
      type: "select", 
      title: "声光报警",
      name: "soundId",
      //value: "name",
      labelField: "name",
      valueField: "id",
      data: "/api/link/ctrl/device?subType=104105"
    }
    let props6 = {
      type: "select", 
      title: "烟类型",
      name: "smogType",
      //value: "name",
      labelField: "name",
      valueField: "id",
      data: [
        {id: "0",name: "烟雾"},
        {id: "1",name: "一氧化碳"},
        {id: "2",name: "二氧化碳"},
        {id: "3",name: "天燃气"}
      ]
    }
    let props7 = {
      type: "select", 
      title: "声音",
      name: "soundType",
      //value: "name",
      labelField: "name",
      valueField: "id",
      data: [
        //{id: "0",name: "停止"},
        {id: "1",name: "盗窃报警"},
        {id: "2",name: "火警"},
        {id: "3",name: "紧急事件"},
        {id: "4",name: "布防"},
        //{id: "5",name: "撤防"}
      ]
    }

    return (
      <div className="container-fluid">
        <div style={{margin: '8px'}}>
          <a href="#linkctrllist">联动列表</a>
          &nbsp;
          <em><a>添加告警联动</a></em>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <strong>告警联动</strong>
          </div>
          <div className="panel-body">
            <form id="alertForm" className="form-horizontal">
              <div className="well">
                <div className="row">
                  <div className="col-md-1"><label className="control-label">联动名称</label></div>
                  <div className="col-md-3"><input type="text" className="form-control" name="name"/></div>
                </div>
              </div>

              <div className="well">
                <div className="row">
                  <div className="col-md-1"><label className="control-label">烟感</label></div>
                  <div className="col-md-3"><SelectBox {...props4} /></div>

                  <div className="col-md-1"><label className="control-label">烟类型</label></div>
                  <div className="col-md-3"><SelectBox {...props6} /></div>
                </div>
              </div>

              <div className="well">
                <div className="row">
                  <div className="col-md-1"><label className="control-label">声光报警</label></div>
                  <div className="col-md-3"><SelectBox {...props5} /></div>

                  <div className="col-md-1"><label className="control-label">声音</label></div>
                  <div className="col-md-3"><SelectBox {...props7} /></div>
                </div>
              </div>

              <button type="button" className="btn btn-info btn-sm" onClick={this.funAlertLinkCtrl.bind(this)}>保存</button>
            </form>
          </div>
        </div>

      </div>
    )
  }

  funAlertLinkCtrl(){
    let fields = $("#alertForm").serializeArray()
    let formData = {}
    fields.map(field => {
      formData[field.name] = field.value
    })
    //console.log(formData)
    ajax({
      type: 'POST',
      url: '/api/link/ctrl/alert/add',
      data: formData
    }, resp => {
      if (resp && 0 === resp.code) {
        alert("成功")
        window.location.href = '#linkctrllist'
      } else {
        alert("失败"+resp.name)
      }
    }, err => {
      console.log(err)
    })
  }
}

module.exports = Module
