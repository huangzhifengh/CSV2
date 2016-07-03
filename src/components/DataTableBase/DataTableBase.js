import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import DataModal from '../DataModal'
import Pagination from './Pagination'
import DataTableStore from '../../stores/DataTableStore'
import DataTableActions from '../../actions/DataTableActions'

class DataTableBase extends Component {

  static propTypes = {
    config: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.action = new DataTableActions()
    this.store = new DataTableStore(this.props.config, this.action) 
    this.state = {
      data: [],
      total: 0,
      page: 1,
      size: 10 // default page size
    }

    this.events = this.props.config.events || {}

    this.__data__ = {}  // current editing data item
    this.__serializedData__ = '' // serialized data via jquery
    this.hasCommandCfg = false
  }

  componentDidMount () {
    this.store.addChangeListener(this._onDataRetrieved.bind(this))
    this.store.addCreateListener(this._onDataChanged.bind(this))
    this.store.addRemoveListener(this._onDataChanged.bind(this))
    this.store.addEditListener(this._onDataChanged.bind(this))

    this._readCurrentPageData()
  }

  componentWillUnmount () {
    this.store.removeListeners()
  }

  _getTable () {
    let columns = $.extend(true, [], this.props.config.columns || [])
    let pagination = this.props.config.pagination
    let command = this.props.config.columns.slice(-1)[0]
    let toolbar = this.props.config.toolbar || []

    if (command.command) {
      columns.pop() 
      command = command.command
    } else {
      command = []
    }
    
    return (
      <div className="tree-table">
        <div className="panel panel-default">
          <div className="panel-heading">
            <strong>{(this.props.config.panelTitle || {}).title || 'Title'}</strong>
            <nav className="pull-right toolbar-vertical-align">
              {command[0] && command[0].name === 'create' && <a onClick={this._onTableRowClick.bind(this, 'create')} className="btn btn-info btn-sm">
                  <span className="glyphicon glyphicon-plus"></span>
                  新增
                </a>
              }
              {toolbar.map(el => {
                return <a key={el.name} className="btn btn-sm btn-primary">
                  {el.text}
                </a>
              })}
            </nav>
          </div>
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                {columns.map(item => {
                  return !item.columnHidden && <th className="data-table-th" key={item.id || Math.random()}>{item.title}</th>
                })}

                {!!command.length && <th className="data-table-th">{command.title || '操作'}</th>}
              </tr>
            </thead>
            {this._getTableBody.call(this, columns, command)}
          </table>
          {pagination&&pagination.show&&<div className="panel-footer" style={{overflow: 'hidden',padding: '5px'}}><Pagination total={this.state.total} size={this.state.size} page={this.state.page} onClick={this._onPaginationClick.bind(this)}/></div>}
          <div className={cx({'load-overlay': true, show: !this.state.data.length})}></div>
        </div>
        <div id="__dataModalContainer"></div>
        <div id="__dataTableMessageArea" className="alert alert-success hide" role="alert">done</div>
      </div>
    )
  }

  _getEditData (data) {
    let config = this.props.config.columns || []
    let length = this.hasCommandCfg ? (config.length - 1) : config.length

    let d = {}
    for (let i = 0; i < length; i++) {
      let name = config[i].name
      d[name] = data[name]
    }

    return d
  }

  _onTableRowClick (type, data, e) {
    this.__data__ = {} // reset

    if (data && data.id) {
      this.__data__ = this._getEditData(data)

      if ('create' !== type) {
        this.__data__.id = data.id
      }
    }

    let result = this.events.onCommandClick && this.events.onCommandClick(type, data, e)

    if (false !== result) {
      let props = {
        onInit: this.events.onModalBodyInit,
        onChange: this._onChange.bind(this),
        onConfirm: this._onConfirm.bind(this, type),
        config: this.props.config,
        type: type,
        data: data
      }

      this._createModel(props)
    }
  }

  _createModel (props) {
    let dDataModalContainer = document.getElementById('__dataModalContainer')

    ReactDOM.unmountComponentAtNode(dDataModalContainer)

    ReactDOM.render(<DataModal {...props} />, dDataModalContainer) 

    this.$$modal = document.getElementById('__dataModal')
    $(this.$$modal).modal()
  }

  _onChange (e) {
    let name = e.target.name
    let value = e.target.value
    this.__data__[name] = value
    this.__serializedData__ = $(e.currentTarget).serialize()
  }

  _customConfirm (type, data) {
    return () => {
      this.events.onSubmit ? this.events.onSubmit(type, data, result => {this._onDataChanged(result)}) : () => {return true}
    }
  }

  _onConfirm (type, e) {
    $(e.target).attr('disabled', true)

    let data = {
      json: this.__data__,
      serialized: this.__serializedData__
    }

    let customConfirm = this._customConfirm(type, data)
    let result = customConfirm()

    switch(type) {
      case 'create':
        if (false !== result) {
          this.action.create(this.__data__)
        }
        break
      case 'edit':
        if (false !== result) {
          this.action.update(this.__data__)
        }
        break
      case 'delete':
        if (false !== result) {
          this.action.remove(this.__data__.id)
        }
        break
    }
  }

  _onDataRetrieved () {
    this.setState(this.store.getData())
  }

  _onDataChanged (ok) {
    $('#__dataModalSubmitButton').removeAttr('disabled')

    if (ok) {
      if (this.$$modal) {
        $(this.$$modal).modal('hide')
      }
      this._showMessage('__dataTableMessageArea', '信息提交成功!')
      this._readCurrentPageData()
    } else {
      this._showMessage('__dataModalMessageArea', '信息提交失败!')
    }
  }

  _showMessage (id, msg) {
    let $alert = $(`#${id}`) 
    $alert.text(msg).hide().removeClass('hide').slideDown(() => {
      setTimeout(() => {
        $alert.slideUp()
      }, 2000)
    })
  }

  _readCurrentPageData () {
    this.store.read({
      size: this.state.size,
      page: this.state.page
    })
  }

  _onPaginationClick (page) {
    if (page && page !== this.state.page) {
      this.setState({
        page: page
      }, () => {
        this._readCurrentPageData()
      })
    }
  }

}

export default DataTableBase
