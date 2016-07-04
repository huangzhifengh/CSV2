import React from 'react'
import Page from 'base-page'
import Table from 'components/Table'

class Job extends Page {

  render () {
    let config = {
      columns: [{
        title: '姓名', 
        name: 'name'
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
          name: 'joe'
        }]
      },
    }

    return this.props.children || <Table {...config} />
  }

}

module.exports = Job
