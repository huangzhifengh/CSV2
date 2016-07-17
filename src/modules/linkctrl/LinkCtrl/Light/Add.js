import React from 'react'
import Page from 'base-page'
import SelectBox from 'components/Form/Elements/SelectBox'

class Module extends Page {

  render () {
    let props1 = {
        type: "select", 
        title: "人体热释",
        name: "personId",
        value: "name",
        labelField: "name",
        valueField: "personId",
        data: "/api/link/ctrl/device?subType=104102"
    }
    let props2 = {
        type: "select", 
        title: "光感设备",
        name: "rayId",
        value: "name",
        labelField: "name",
        valueField: "rayId",
        data: "/api/link/ctrl/device?subType=103103"
    }
    let props3 = {
        type: "select", 
        title: "灯",
        name: "linghtId",
        value: "name",
        labelField: "name",
        valueField: "linghtId",
        data: "/api/link/ctrl/device?subType=105101"
    }

    return (
      <div className="container-fluid">
        <div style={{margin: '8px'}}>
          <a href="#linkctrllist">联动列表</a>
          &nbsp;
          <em><a>添加灯联动</a></em>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <strong>灯联动</strong>
          </div>
          <div className="panel-body">
            <form id="linghtForm" className="form-horizontal">
              <div className="well">
                <div className="row">
                  <div className="col-md-1"><label className="control-label">联动名称</label></div>
                  <div className="col-md-3"><input type="text" className="form-control" name="name"/></div>
                </div>
              </div>

              <div className="well">
                <div className="row">
                  <div className="col-md-1"><label className="control-label">人感设备</label></div>
                  <div className="col-md-3"><SelectBox {...props1} /></div>
                </div>
                <br></br>
                <div className="row">
                  <div className="col-md-1"><label className="control-label">光感设备</label></div>
                  <div className="col-md-3"><SelectBox {...props2} /></div>

                  <div className="col-md-1"><label className="control-label">光感强度</label></div>
                  <div className="col-md-3"><input type="text" className="form-control" name="lightIntensity"/></div>
                </div>
              </div>

              <div className="well">
                <div className="row">
                  <div className="col-md-1"><label className="control-label">灯</label></div>
                  <div className="col-md-3"><SelectBox {...props3} /></div>
                </div>
              </div>

              <button type="button" className="btn btn-info btn-sm" onClick={this.funLightLinkCtrl.bind(this)}>保存</button>
            </form>
          </div>
        </div>

      </div>
    )
  }

  funLightLinkCtrl(){
    let fields = $("#linghtForm").serializeArray()
    let formData = {}
    fields.map(field => {
      formData[field.name] = field.value
    })
    //console.log(formData)
    ajax({
      type: 'POST',
      url: '/api/link/ctrl/linght/add',
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
