import React from 'react';
import Page from 'base-page';
import Echarts from 'echarts';
import Table from 'components/Table';

class Module extends Page {

  constructor (props) {
    super(props)

    this.state = {
      data: [],
      loaded: false,
    }
  }

  componentDidMount (){
    ajax({
      type: 'POST',
      url: '/api/rpt/list',
      data: {
        script: "SELECT t1.Name, COUNT (*) AS seq FROM D_DEVICE t1 GROUP BY t1.Name ORDER BY seq ASC",
        pageNum: 1,
        pageSize: 100,
        pageCount: 1,
        recordCount: 0
      }
    }, resp => {
      this.setState({
        data: this.format(resp.list),
        loaded: true,
      })

      this.initChart(resp.list)
    }, err => {
      console.log('error',err)
    })
  }

  format (data) {
    return data.map(item => {
      return {
        name: item[0],
        value: item[1],
      }
    })
  }

  initChart (data) {
    let legendD = [] 
    let seriesD = []

    _(data).forEach(function(item){
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

  getConfig () {
    return {
      dataSource: {
        data: this.state.data,
      },
      //title: '表格',
      checkable: false,
      pagination: {show: true, pageSize: 10},
      columns: [
        {name: 'name', title:'设备类型'},
        {name: 'value', title:'设备数量'},
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

        {this.state.loaded && <Table {...this.getConfig()} />}
      </div>
    )
  }

}

module.exports = Module
