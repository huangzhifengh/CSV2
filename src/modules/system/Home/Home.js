import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {
  
  componentDidMount (){
    console.log(this)
  }

  getConfig1 () {
    let dataSource = new DataSource({
      data: [["机房空调",1],["机房漏水",1],["机房温湿度",1],["监控类",1],["开关类",1],["空调",1],["门",1],["照明类",1],["窗",1],["计量类",4]],
      /*data: [
        ['test1',1],
        ['test2',1]
      ],*/
    });

    ajax({
      type: 'POST',
      url: '/api/rpt/list',
      data: {
        script: "SELECT t1.Type, COUNT (*) AS seq FROM D_DEVICE t1 GROUP BY t1.Type ORDER BY seq ASC",
        pageNum: 1,
        pageSize: 100,
        pageCount: 1,
        recordCount: 0
      }
    }, resp => {
      dataSource.data = resp.list;
      dataSource.sync();
    }, err => {
      console.log('error',err)
    })

    return {
      dataSource: dataSource,
      //title: '表格',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备类型'},
        {title:'设备数量'},
      ]
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">设备分类统计</div>
          <div className="panel-body">
            <div id="graph">暂无数据</div>
          </div>
        </div>

        <Table {...this.getConfig1()} />
      </div>
    )
  }

}

module.exports = Module
