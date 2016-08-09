import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig1 () {
    return {
      dataSource: new DataSource({transport:{
        read:'/api/dervices/list',
        create: '/api/dervices/add',
        update: '/api/dervices/edit',
        destroy: '/api/dervices/del'
      }}),
      title: '施工报表',
      pagination: {rows: 10},
      checkable: false,
      toolbar: [{name: 'export',text: '导出'}],
      columns: [
        {title:'设备名称',name:'name'},
        {title:'设备MAC',name:'macAdd'},
        {title:'回路',name:'circuit'},
        {title:'一级域',name:'location1'},
        {title:'二级域',name:'location2'},
        {title:'三级域',name:'location3'},
        {title:'描述',name:'des'},
      ]
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
      </div>
    )
  }

  _onCommandClick (type, data, e) {
    if ('export' === type) {
      data.focus = e.target.checked;
      ajax({
        url: '/api/dervices/edit',
        data: data,
        success: resp => {
          if (resp && 0 === resp.code) {
            alert("成功");
          } else {
            alert("失败");
          }
        }
      })
      return false
    }
  }

}

module.exports = Module
