import React, { Component, PropTypes } from 'react'
import Form from '../Form'

class DataModal extends Component {

  static propTypes = {
    fields: PropTypes.array.isRequired,
    type: PropTypes.string,
    data: PropTypes.object,
    dataSource: PropTypes.object,
    confirmCallback: PropTypes.func,
  }

  render() {
    return <div ref="dataModal" className="modal fade" tabIndex="-1" role="dialog" data-backdrop="static">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{'destroy' === this.props.type ? '删除' : ('create' === this.props.type ? '新增' : '编辑')}</h4>
          </div>
          <div className="modal-body">{'destroy' === this.props.type ? <p>确认删除该条数据？</p> : <Form ref="form" {...this.props} />}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
            <button type="button"  className="btn btn-primary" onClick={::this.onConfirm}>确认</button>
          </div>
        </div>
      </div>
    </div>
  }

  componentDidMount () {
    $(this.refs.dataModal).modal()
  }

  onConfirm () {
    if ('destroy' === this.props.type) {
      this.props.dataSource.destroy(this.props.data.id, ::this.confirmCallback)
    } else {
      this.refs.form.submit(this.props.type, ::this.confirmCallback)
    }
  }

  confirmCallback () {
    $(this.refs.dataModal).modal('hide')
    this.props.confirmCallback()
  }

}

export default DataModal

