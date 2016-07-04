import React, { Component } from 'react'
import Form from '../Form'

class DataModal extends Component {

  static propTypes = {
    type: React.PropTypes.string,
    data: React.PropTypes.object,
    fields: React.PropTypes.array.isRequired,
    dataSource: React.PropTypes.object,
  }

  render() {
    return (
      <div ref="dataModal" className="modal fade" tabIndex="-1" role="dialog" data-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{'delete' === this.props.type ? '删除' : ('create' === this.props.type ? '新增' : '编辑')}</h4>
            </div>
            <div className="modal-body">{'delete' === this.props.type ? <p>确认删除该条数据？</p> : <Form {...this.props} />}</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button"  className="btn btn-primary" onClick={this.onConfirm.bind(this)}>确认</button>
            </div>
          </div>
        </div>
      </div>)
  }

  componentDidMount () {
    $(this.refs.dataModal).modal()
  }

  onConfirm (e) {
    this.refs.form.save()
  }

}

export default DataModal

