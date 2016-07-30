import React, { Component, PropTypes } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import DataSource from '../DataSource'
import Modal from './Modal'
import Toolbar from './Toolbar'
import Colgroup from './Colgroup'
import Header from './Header'
import Body from './Body'
import Pagination from '../Pagination'
import withStyles from 'with-style'
import styles from './Table.css'

@withStyles(styles)
class Table extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    filter: PropTypes.object,
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    checkable: PropTypes.bool,
    dataSource: PropTypes.object,
  }

  constructor (props) {
    super(props)

    this.dataSource = (props.dataSource instanceof DataSource) ? props.dataSource : new DataSource(props.dataSource)
    this.dataSource.setRefreshHook(::this.refresh)

    this.builtInCommands = ['create', 'update', 'destroy']

    this.state = {
      data: _.extend([], this.dataSource.data),
    }

    this.events = props.events || {}
  }

  componentDidMount () {
    if (this.props.autoRead !== false) this.read()
  }

  render () {
    let { title, columns, pagination, toolbar = [], checkable, detailInit } = this.props
    columns = $.extend(true, [], columns)
    let command = columns.slice(-1)[0] || {}

    if (command.command) {
      columns.pop() 
      command = command.command
    } else {
      command = []
    }

    let props = { columns, checkable, detailInit, command, onClick: ::this.onCommandClick }
    
    return <div className="data-table table-container">
      <Toolbar title={title} buttons={toolbar} onClick={::this.onCommandClick} />
      <table className="table table-bordered table-hover">
        <Colgroup {...props} />
        <Header {...props} />
        <Body {...props} data={this.state.data} />
      </table>
      <Pagination {...pagination} dataSource={this.dataSource} />
      <div ref="dataModalContainer"></div>
    </div>
  }

  refresh (resp) {
    resp && this.setState({data: resp.data})
  }

  read () {
    this.dataSource.read(::this.refresh)
  }

  onCommandClick (command, data, e) {
    this.dataSource.setActiveData(data)
    if (command.click) command.click(data)
    else if (_(this.builtInCommands).indexOf(command.name) !== -1) {
      let props = {
        type: command.name,
        data: data,
        fields: this.props.columns,
        dataSource: this.dataSource,
        confirmCallback: ::this.read,
      }
      let dModalContainer = this.refs.dataModalContainer
      unmountComponentAtNode(dModalContainer)
      render(<Modal {...props} />, dModalContainer) 
    }
  }

  componentWillUnmount () {
    this.dataSource.removeListeners()
  }

}

export default Table 

