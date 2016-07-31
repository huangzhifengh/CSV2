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
    dataSource.read();
    console.log(dataSource,dataSource.data,dataSource.idField);
    this.setDataSource(dataSource.data);
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
        data: this.state.data,
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

  render() {
    //console.log(this)
    return this.props.children || (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
      </div>
    )
  }

}

module.exports = Module
