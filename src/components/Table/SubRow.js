import React, { Component, PropTypes } from 'react'
import Table from './Table'
import Cell from './Cell'

class SubRow extends Component {

  render () {

    let { span, initFunction, data, ...other} = this.props

    if (!_.isFunction(initFunction)) {
      return <tr />
    }


    let Content = null
    let result = initFunction(data)
    if (_.isFunction(result)) Content = result 
    else if (_.isObject(result)) Content = () => <Table {...result} />

    return <tr {...other} >
      <Cell colSpan={span}>
        <div className="sub-row-content">
          <Content />
        </div>
      </Cell>
    </tr>
  }

}

export default SubRow
