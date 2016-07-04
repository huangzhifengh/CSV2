import React, { Component, PropTypes } from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import Modal from './Modal'
import DataSource from '../DataSource'
import Pagination from '../Pagination'

class DataTableBase extends Component {

  static propTypes = {
    columns: PropTypes.array.isRequired,
    pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
    checkable: PropTypes.bool,
    dataSource: PropTypes.object,
  }

  constructor (props) {
    super(props)
    
    this.dataSource = new DataSource(props.dataSource)

    this.state = {
      data: props.dataSource && props.dataSource.data || [],
    }
  }

  componentDidMount () {
    //this.dataSource.read(data => {
    //  data && this.setState({data})
    //})
  }

  getTable () {
    let { columns, pagination, toolbar = [], checkable } = this.props
    columns = $.extend(true, [], columns)
    let command = columns.slice(-1)[0]

    if (command.command) {
      columns.pop() 
      command = command.command
    } else {
      command = []
    }
    
    return (
      <div className="table">
        <div className="panel panel-default">
          <div className="panel-heading">
            <strong className="table-title">{(this.props.panelTitle || {}).title || 'Title'}</strong>
            <nav className="pull-right toolbar-vertical-align">
              {toolbar.map((item, index) => {
                return <a key={index} className="btn btn-sm btn-primary" onClick={this.onCommandClick.bind(this, item, null)}>
                  {item.icon && <span className={`glyphicon glyphicon-${item.icon}`}></span>}
                  {item.text}
                </a>
              })}
            </nav>
          </div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {checkable && <th><input type="checkbox" /></th>}
                {columns.map((item, index) => {
                  return !item.columnHidden && <th className="data-table-th" key={index}>{item.title}</th>
                })}
                {!!command.length && <th className="data-table-th">{command.title || '操作'}</th>}
              </tr>
            </thead>
            {this.getTableBody.call(this, columns, command, checkable)}
          </table>
          <div className="panel-footer" style={{overflow: 'hidden',padding: '5px'}}>
            {pagination && <Pagination {...this.props.pagination} dataSource={this.dataSource} />}
          </div>
        </div>
        <div ref="dataModalContainer"></div>
      </div>
    )
  }

  onCommandClick (command, data, e) {
    if (command.click) command.click(e, data)
    else {
      let props = {
        type: command.name,
        data: data,
        fields: this.props.columns,
        dataSource: this.dataSource,
      }
      let dModalContainer = this.refs.dataModalContainer
      unmountComponentAtNode(dModalContainer)
      render(<Modal {...props} />, dModalContainer) 
    }
  }
}

export default DataTableBase

