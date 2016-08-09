import React from 'react';
import Page from 'base-page';
import Form from 'components/Form';
import Table from 'components/Table';
import DataSource from 'components/DataSource';
import SelectBox from 'components/Form/Elements/SelectBox';

class Module extends Page {

  getFormConf () {
    let Element
    let props = {
      type: '',
      data: {id: ''},
      fields: [
        {name:'jobName',title:'任务名称'},
        {name:'jobInstruct',title:'执行指令',data:[{id:'0',text:'开灯'},{id:'1',text:'关灯'}],type:'select'},
        {name:'jobType',title:'任务类型',data:[{id:'0',text:'执行一次'},{id:'1',text:'重复执行'}],type:'select'},
        {name:'jobDate',title:'日期'},
        {name:'jobTime',title:'时间'},
        {name:'jobWeek',title:'周几',value:"name",data:[{id:'1',name:'周一'},{id:'2',name:'周二'},{id:'3',name:'周三'},{id:'4',name:'周四'},{id:'5',name:'周五'},{id:'6',name:'周六'},{id:'0',name:'周日'}],type:'option'},
        {name:'jobDesc',title:'描述'}
      ]
    }
    Element = <Form ref="form" {...props} />
    
    return Element
  }

  getConfig () {
    return {
      dataSource: new DataSource({transport:{read:'/api/dervices/list'}}),
      title: '选择设备',
      checkable: true,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'回路',name:'circuit'},
        {title:'一级域',name:'location1'},
        {title:'二级域',name:'location2'},
        {title:'三级域',name:'location3'}
      ]
    }
  }

  render () {
    let props1 = {
      type: "select", 
      title: "执行指令",
      name: "jobInstruct",
      //value: "text",
      labelField: "text",
      valueField: "id",
      data: [{id:'0',text:'开灯'},{id:'1',text:'关灯'}]
    }
    let props2 = {
      type: "select", 
      title: "任务类型",
      name: "jobType",
      //value: "text",
      labelField: "text",
      valueField: "id",
      data: [{id:'0',text:'执行一次'},{id:'1',text:'重复执行'}]
    }

    var DateTimeField = require('react-bootstrap-datetimepicker');
    let dataConfig = {
      inputProps: {name: "jobDate"},
      mode: 'date',
      inputFormat: "YYYY-MM-DD"
    }
    let timeConfig = {
      inputProps: {name: "jobTime"},
      mode: 'time',
      inputFormat: "HH:mm:ss"
    }

    return (
      <div className="container-fluid">
        <div style={{margin: '8px'}}>
          <a href="#joblist">任务列表</a>
          &nbsp;
          <em><a>添加任务</a></em>
        </div>
        <div className="panel panel-default">
          <div className="panel-heading">
            <strong>添加任务</strong>
          </div>
          <div id="jobForm" className="panel-body">
            <form id="alertForm" className="form-horizontal">
              <div className="row form-group">
                <div className="col-md-1"><label className="control-label">任务名称</label></div>
                <div className="col-md-3"><input type="text" className="form-control" name="jobName"/></div>

                <div className="col-md-1"><label className="control-label">执行指令</label></div>
                <div className="col-md-3"><SelectBox {...props1} /></div>

                <div className="col-md-1"><label className="control-label">任务类型</label></div>
                <div className="col-md-3"><SelectBox {...props2} /></div>
              </div>

              <div className="row form-group">
                <div className="col-md-1"><label className="control-label">日期</label></div>
                <div className="col-md-3"><DateTimeField {...dataConfig} /></div>

                <div className="col-md-1"><label className="control-label">时间</label></div>
                <div className="col-md-3"><DateTimeField {...timeConfig} /></div>
              </div>

              <div className="row form-group">
                <div className="col-md-1"><label className="control-label">周几</label></div>
                <div className="col-md-11">
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="1"/>周一</label>
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="2"/>周二</label>
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="3"/>周三</label>
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="4"/>周四</label>
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="5"/>周五</label>
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="6"/>周六</label>
                  <label className="checkbox-inline"><input type="checkbox" name="jobWeek" value="0"/>周日</label>
                </div>
              </div>

              <div className="row form-group">
                <div className="col-md-1"><label className="control-label">描述</label></div>
                <div className="col-md-3"><input type="text" className="form-control" name="jobDesc"/></div>
              </div>
            </form>

            <Table {...this.getConfig()} />

            <button id="jobBut" type="button" className="btn btn-info btn-sm" onClick={this.funLightLinkCtrl.bind(this)}>保存</button>
          </div>
        </div>

      </div>
    )
  }

  funLightLinkCtrl(){
    let fields = $("#jobForm form").serializeArray()
    let formData = {}
    let jobWeekArr = []
    fields.map(field => {
      if('jobWeek' === field.name){
        jobWeekArr.push(field.value)
      }else{
        formData[field.name] = field.value
      }
    })
    formData.jobWeek = jobWeekArr.join(',')

    let deviceIds = [];
    $('#jobForm .table-row-checkbox:checked').each(function(i,e){
      deviceIds.push($(e).attr('data-id'));
    })
    if(deviceIds.length>0){
      formData.deviceId = deviceIds.join(',');
    }
    //console.log(deviceIds,formData)

    ajax({
      type: 'POST',
      url: '/api/job/add',
      data: formData
    }, resp => {
      if (resp && 0 === resp.code) {
        alert("成功")
        window.location.href = '#joblist'
      } else {
        alert("失败"+resp.name)
      }
    }, err => {
      console.log(err)
    })
  }

}

module.exports = Module
