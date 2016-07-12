import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'

class Module extends Page {

  render () {
    let config = {
      columns: [{
        title: '姓名', 
        name: 'name',
        validation: (value, data) => {
          return value === 'joezhou'
        },
        tip: 'tip'
      }, {
        title: '操作',
        command: [{
          name: 'edit',
          text: 'edit'
        }]
      }],
      toolbar: [{
        text: 'add', 
        name: 'create'
      }],
      dataSource: {
        data: [{
          name: 'joe',
        }],
        transport: {
          read: '',
          detail: '',
        },
      },
      detailInit: () => {
        return () => <div className="haha">sub row data</div>
      },
      checkable: false,
    }

    return this.props.children || <Table {...config} />
  }

}

module.exports = Module
