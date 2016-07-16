import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'
import DataSource from 'components/DataSource'

class Module extends Page {

  getConfig1 () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/link/ctrl/linght/list',
        create: '',
        update: '',
        destroy: '/api/link/ctrl/linght/del'
      },
    })

    return {
      title: '灯联动',
      pagination: {
        show: true,
        pageSize: 10
      },
      columns: [{
          title: '联动名称',
          name: 'name'
        }, {
          title: '人体热释',
          name: 'personName'
        }, {
          title: '光感',
          name: 'rayName'
        }, {
          title: '光强度',
          name: 'lightIntensity'
        }, {
          title: '灯',
          name: 'linghtName'
        }, {
          title: '启用状态',
          name: 'status',
          parse: (value, data) => {
            let show = '';
            if(0 == data.status){
              show = '停用'
            }
            if(1 == data.status){
              show = '启用'
            }
            return show
          }
        }, {
        command: [{
            name: 'active',
            text: '启用',
            click: (data) => {
              data.status = 1
              this.setJobStatu(data,'/api/link/ctrl/linght/edit',dataSource)
            }
          }, {
            name: 'inactive',
            text: '停用',
            click: (data) => {
              data.status = 0
              this.setJobStatu(data,'/api/link/ctrl/linght/edit',dataSource)
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
          window.location.href = "#linkctrllist/linkCtrlLightAdd"
        }
      }],
      dataSource: dataSource,
      checkable: false
    }
  }

  getConfig2 () {
    let dataSource = new DataSource({
      transport: {
        read: '/api/link/ctrl/alert/list',
        create: '',
        update: '',
        destroy: '/api/link/ctrl/alert/del'
      },
    })

    return {
      title: '告警联动',
      pagination: {
        show: true,
        pageSize: 10
      },
      columns: [{
          title: '联动名称',
          name: 'name'
        }, {
          title: '烟感',
          name: 'smogName'
        }, {
          title: '烟类型',
          name: 'smogType',
          parse: (value, data) => {
            let show = '';
            if(0 == data.smogType){
              show = '烟雾'
            }
            if(1 == data.smogType){
              show = '一氧化碳'
            }
            if(2 == data.smogType){
              show = '二氧化碳'
            }
            if(3 == data.smogType){
              show = '天燃气'
            }
            return show
          }
        }, {
          title: '声光报警',
          name: 'soundName'
        }, {
          title: '声音',
          name: 'soundType',
          parse: (value, data) => {
            let show = '';
            if(1 == data.soundType){
              show = '盗窃报警'
            }
            if(2 == data.soundType){
              show = '火警'
            }
            if(3 == data.soundType){
              show = '紧急事件'
            }
            if(4 == data.soundType){
              show = '布防'
            }
            return show
          }
        }, {
          title: '启用状态',
          name: 'status',
          parse: (value, data) => {
            let show = '';
            if(0 == data.status){
              show = '停用'
            }
            if(1 == data.status){
              show = '启用'
            }
            return show
          }
        }, {
        command: [{
            name: 'active',
            text: '启用',
            click: (data) => {
              data.status = 1
              this.setJobStatu(data,'/api/link/ctrl/alert/edit',dataSource)
            }
          }, {
            name: 'inactive',
            text: '停用',
            click: (data) => {
              data.status = 0
              this.setJobStatu(data,'/api/link/ctrl/alert/edit',dataSource)
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
          window.location.href = "#linkctrllist/linkCtrlAlertAdd"
        }
      }],
      dataSource: dataSource,
      checkable: false
    }
  }

  render() {
    return this.props.children || (
      <div className="container-fluid">
        <Table {...this.getConfig1()} />
        <Table {...this.getConfig2()} />
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
