import React from 'react';
import Page from 'base-page';
import Echarts from 'echarts';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {
  
  constructor (props) {
    super(props)

    this.dataSource = new DataSource({
      data: [
        ["机房空调",1],["机房漏水",1],["机房温湿度",1],["监控类",1],["开关类",1],["空调",1],
        ["门",1],["照明类",1],["窗",1],["计量类",4],["监测类",5],["感应类",5]
      ]
    })
  }

  componentDidMount (){
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
      this.dataSource.data = resp.list;
    }, err => {
      console.log('error',err)
    })

    let legendD = new Array();
    let seriesD = new Array();
    _(this.dataSource.data).forEach(function(item){
      legendD.push(item[0]);
      seriesD.push({name: item[0],value: item[1]})
    })
    var myChart = Echarts.init(document.getElementById('graph'));
    var option = {
        title : {
            text: '设备分类统计',
            subtext: '应用分类',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: legendD
        },
        series : [
            {
                name: '设备分类',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: seriesD,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
  }
  
  getConfig1 () {
    return {
      dataSource: this.dataSource,
      //title: '表格',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备类型',parse:(value,data)=>{return data[0]}},
        {title:'设备数量',parse:(value,data)=>{return data[1]}},
      ]
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">设备分类统计</div>
          <div className="panel-body">
            <div id="graph" style={{width: '100%',height: '400px'}}>暂无数据</div>
          </div>
        </div>

        <Table {...this.getConfig1()} />
      </div>
    )
  }

}

module.exports = Module
