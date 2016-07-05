import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import styles from './SelectBox.css'
import withStyles from 'with-style'
import TreeLikeUI from '../../TreeLikeUI'

@withStyles(styles)
class SelectBox extends Component {

  static propTypes = {
    value: React.PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      data: []
    }

    if ('array' == $.type(this.props.data)) {
      this.state.data = this.props.data
      this.localType = true
    }

    this.hasInit = false
  }

  getSelectElement () {
    let config = this.props

    if ('tree' === config.content) {
      return <div className="custom-select-wrapper has-feedback">
        <input ref="fakeInput" className="form-control" defaultValue={this.props.value} onClick={this._toggleSelectContent.bind(this)} />
        <div className="custom-select-option-list"></div>
        <span className="glyphicon glyphicon-triangle-bottom form-control-feedback"></span>
        <input name={config.name} ref="realInput" type="text" className="hide" defaultValue={this.props.value} />
      </div>
    }

    return <div>
      <select name={config.name} className="form-control" value={this.props.value} onClick={this.init.bind(this)} onChange={this._onChange}>
        {this.state.data.map(item => {
          return <option key={item[config.key || 'id']} value={item[config.key || 'id']}>{item[config.value || 'text']}</option>
        })}
      </select> 
      {!this.localType && <span className="help-block">点击加载数据</span>}
    </div>
  }

  render() {

    return this.getSelectElement() 

  }

  init () {
    if (!this.localType && !this.hasInit) {
      this.hasInit = true
      let data = this.props.data
      if (data && 'string' === typeof data) {
        ajax({
          url: this.props.data
        }, resp => {
          this.setState({
            data: resp.data
          })
        })
      }
    }
  }

  _onChange (e) {
    console.log(e.target.value)
    return false
  }

  _onSelected (data) {
    this.refs['fakeInput'].value = data[this.props.value || 'text']
    $(this.refs['fakeInput']).click()
    this.refs['realInput'].value = data.id
    this.refs['realInput'].dispatchEvent(new Event('input', {bubbles: true}))
  }

  _toggleSelectContent (e) {
    if (!this.hasInit) {
      this.hasInit = true
      let props = {
        data: this.props.data,
        nolink: true,
        onItemClick: this._onSelected.bind(this),
        textField: this.props.value || 'text'
      }
      ReactDOM.render(<TreeLikeUI {...props} />, $(e.target).next('div').get(0))
    }

    e.stopPropagation()
    $(e.target).next('div').slideToggle('fast')
  }

}

export default SelectBox

