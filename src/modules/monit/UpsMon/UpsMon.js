import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {

  constructor (props) {
    super(props)

    this.state = {
      data: [],
      loaded: false,
    }
  }

  componentDidMount (){
    let dataSource = new DataSource({transport:{read:'/api/devices/statu/funRoomMon/list?subType=202101'}});
    //dataSource.read();
    //console.log(dataSource,dataSource.data,dataSource.idField);
    //this.setDataSource(dataSource.data);
  }

  setDataSource (data) {
    this.setState({
      data: data,
      loaded: true
    });
  }

  getConfig1 () {
    return {
      dataSource: {
        transport:{read:'/api/devices/statu/funRoomMon/list?subType=202101'}
      },
      title: 'UPS',
      checkable: false,
      pagination: {show:true,pageSize:10},
      columns: [
        {title:'设备名称',name:'name'},
        {title:'区域',name:'location',parse:(value,data)=>{let show='';if(data.location1){show=data.location1;if(data.location2){show+=' '+data.location2;if(data.location3){show+=' '+data.location3}}}return show}},
        {title:'状态',name:'devSelfStatus',parse:(value,data)=>{return '正常'}},
        {command:[{name:'show',text:'详情',
          click: (data) => {
            window.location.href='#ups/detail/'+data.id
          }
        }]}
      ]
    }
  }

  /*render() {
    //console.log(this)
    return this.props.children || (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
      </div>
    )
  }*/

  render() {
    return (
      <div className="container-fluid">
        <div className="panel panel-default">
          <div className="panel-heading">UPS监测</div>
          <div className="panel-body">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A1：输入电压=======227.0</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A2：故障电压=======227.0</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A3：输出电压=======220.0</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A4：输出负载（%）=======0.4500</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A5：频率=======50.00</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A6：电池电压=======13.32</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">A7：温度=======32.00</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D1：市电电压=======正常</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D2：电池欠压=======否</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D3：旁路供电=======否</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D4：UPS故障=======否</div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D5：自测试中=======否</div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">D6：蜂呜器开关=======否</div>
            </div>

          </div>
        </div>
      </div>
    )
  }

}

module.exports = Module
