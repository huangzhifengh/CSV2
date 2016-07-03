import React, { Component } from 'react'
import Form from '../Form'
import ajax from '../../ajax'

class DataModal extends Component {

  constructor (props) {
    super(props)

    this.state = {
      data: props.data
    }
  }

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    config: React.PropTypes.object.isRequired,
    data: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onConfirm: React.PropTypes.func,
    onInit: React.PropTypes.func,
  }

  componentDidMount () {
    let config = this.props.config

    if ('remote' === config.editMode && config.transport.detail && 'edit' === this.props.type) {
      $('#__dataModalSubmitButton').attr('disabled', true)
      ajax({
        url: config.transport.detail.url || config.transport.detail,
        data: {
          id: this.props.data.id
        }
      }, resp => {
        if (resp) {
          this.setState({
            data: resp.data
          }, () => {
            $('#__dataModalSubmitButton').removeAttr('disabled')
          })
        }
      })
    }
  }

  getModalContent () {

    let Element
    let type = this.props.type
    if (this.props.onInit) {
      Element = this.props.onInit(type, this.props.data)
      if (Element) {
        return Element
      }
    }

    if (type === 'delete') {
      Element = <p>确认删除该条数据？</p>
    } else {
      let props = {
        columns: this.props.config.columns,
        data: this.state.data,
        type: this.props.type,
        onChange: this.props.onChange
      }
      Element = <Form ref="form" {...props} />
    }

    return Element

  }

  render() {

    return (
      <div id="__dataModal" className="modal fade" tabIndex="-1" role="dialog" data-backdrop="static">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">{'delete' === this.props.type ? '删除' : ('create' === this.props.type ? '新增' : '编辑')}</h4>
            </div>
            <div className="modal-body">
              <div id="__dataModalMessageArea" className="alert alert-danger hide">信息提交失败</div>
              {this.getModalContent()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
              <button type="button" id="__dataModalSubmitButton" className="btn btn-primary" onClick={this._onConfirm.bind(this)}>确认</button>
            </div>
          </div>
        </div>
      </div>)

  }

  _onConfirm (e) {
    //if ('delete' !== this.props.type && !this.refs['form'].isValid) {
      //return
    //}
    this.props.onConfirm && this.props.onConfirm(e)
  }

}

export default DataModal

