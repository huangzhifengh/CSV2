import React, { Component, PropTypes } from 'react'
import Table from './Table'
import Cell from './Cell'

class SubRow extends Component {

  constructor () {
    super()

    this.state = {
      hasInit: false,
    }
  }

  render () {

    let { span, initFunction, data, className, ...other} = this.props

    if (!_.isFunction(initFunction)) {
      return <tr />
    }

    let Content = null
    let result = initFunction(data)
    if (_.isFunction(result)) Content = result 
    else if (_.isObject(result)) Content = () => <Table {...result} />

    return <tr ref="row" {...other} className={`hidden ${className}`}>
      <Cell colSpan={span}>
        <div className="sub-row-content">
        {this.state.hasInit ? <Content />: <span />}
        </div>
      </Cell>
    </tr>
  }

  toggle () {
    if (!this.state.hasInit) {
      this.setState({
        hasInit: true,
      })
    }

    $(this.refs.row).toggleClass('hidden')
  }

}

export default SubRow
