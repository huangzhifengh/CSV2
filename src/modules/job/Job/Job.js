import React from 'react';
import Page from 'base-page';
import Table from 'components/Table';
import DataSource from 'components/DataSource';

class Module extends Page {

  getConfig () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/job/list',
        destroy: '/api/job/del'
      }
    });

    return {
      dataSource: dataSource,
      title: '任务管理',
      checkable: false,
      pagination: {
        show: true,
        pageSize: 10
      },
      columns: [{
          title: '任务编号',
          name: 'jobId',
          createHidden: true,
          editHidden: true
        }, {
          title: '名称',
          name: 'jobName'
        }, {
          title: '任务类型',
          name: 'jobType',
          parse: (value, data) => {
            let show = '';
            if(0 == data.jobType){
              show = '执行一次'
            }
            if(1 == data.jobType){
              show = '重复执行'
            }
            return show
          }
        }, {
          title: '日期',
          name: 'jobDate'
        }, {
          title: '时间',
          name: 'jobTime'
        }, {
          title: '重复日',
          name: 'jobWeek'
        }, {
          title: '执行指令',
          name: 'jobInstruct',
          parse: (value, data) => {
            let show = '';
            if(0 == data.jobInstruct){
              show = '开灯'
            }
            if(1 == data.jobInstruct){
              show = '关灯'
            }
            return show
          }
        }, {
          title: '启用状态',
          name: 'jobStatu',
          parse: (value, data) => {
            let show = '';
            if(0 == data.jobStatu){
              show = '停用'
            }
            if(1 == data.jobStatu){
              show = '启用'
            }
            return show
          }
        }, {
          title: '描述',
          name: 'jobDesc'
        }, {
          command: [{
            name: 'active',
            text: '启用',
            click: (data) => {
              data.jobStatu = 1
              this.setJobStatu(data,'/api/job/edit',dataSource)
            }
          }, {
            name: 'inactive',
            text: '停用',
            click: (data) => {
              data.jobStatu = 0
              this.setJobStatu(data,'/api/job/edit',dataSource)
            }
          }, {
            name: 'destroy',
            text: '删除'
          }]
      }],
      toolbar: [{
        name: 'create',
        text: '新增',
        click: (data) => {
          window.location.href = "#joblist/add"
        }
      }]
    }
  }

  render() {
    return this.props.children || (
      <div className="container-fluid">
        <Table {...this.getConfig()} />
      </div>
    )
  }

  setJobStatu (data,url,dataSource) {
    ajax({
      url: url,
      data: data,
      success: resp => {
        if (resp && 0 === resp.code) {
          dataSource.sync()
        } else {
          alert("失败："+resp.name)
        }
      }
    })
  }

}

module.exports = Module
