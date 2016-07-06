import React, { Component, PropTypes } from 'react'
import Row from './Row'
import SubRow from './SubRow'

class Body extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    detailInit: PropTypes.func,
    checkable: PropTypes.bool,
    command: PropTypes.array,
    onClick: PropTypes.func.isRequired,
  }

  static defaultProps = {
    data: [],
    columns: [],
    command: [],
    detailInit: undefined,
    checkable: false,
    onClick: () => {},
  }

  constructor (props) {
    super(props)

    this.span = props.columns.length
    if (props.command) this.span++
    if (props.checkable) this.span++
    if (props.detailInit) this.span++

    this.subRows = []
  }

  getRows () {
    let { data, detailInit, ...other } = this.props
    let rows = []
    this.subRows = []

    if (data.length) {
      data.map((item, index) => {
        rows.push(<Row key={index} {...other} data={item} data-index={index} hasDetail={!!detailInit} toggleSubrow={::this.toggleSubrow} />)
        detailInit && rows.push(<SubRow 
                                ref={row => row && this.subRows.push(row)}
                                key={(index + 1) * 10} 
                                initFunction={detailInit} 
                                span={this.span} 
                                data={item} 
                                className='sub-row' 
                                data-index={index} />)
      })
    } else {
      rows.push(<tr key={Math.random()} className="data-table-empty-row"><td colSpan={this.span}>暂无数据</td></tr>)
    }

    return rows
  }

  render() {
    return <tbody>{this.getRows()}</tbody>
  }

  toggleSubrow (index) {
    let subRow = this.subRows[index]
    if (subRow) subRow.toggle()
  }

}

export default Body
