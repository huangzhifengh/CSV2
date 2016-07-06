import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import TreeLikeUI from '../../TreeLikeUI'
import styles from './SelectBox.css'
import withStyles from 'with-style'

@withStyles(styles)
class SelectBox extends Component {

  static propTypes = {
    value: PropTypes.string,
  }

  constructor (props) {
    super(props)

    this.state = {
      data: []
    }

    if (_.isArray(props.data)) {
      this.state.data = props.data
      this.localType = true
    }

    this.hasInit = false
  }

  getSelectElement () {

    let config = this.props

    if ('tree' === config.content) {
      return <div className="custom-select-wrapper has-feedback">
        <div ref="fakeInput" className="form-control" onClick={this._toggleSelectContent.bind(this)}>{config.value}</div>
        <span className="glyphicon glyphicon-triangle-bottom form-control-feedback" />
        <div ref="list" className="custom-select-option-list"></div>
        <input ref="realInput" name={config.name} type="text" className="hide" defaultValue={config.value} />
      </div>
    }

    return <div>
      <select name={config.name} className="form-control" value={config.value} onClick={this.init.bind(this)} onChange={this._onChange}>
        {this.state.data.map(item => {
          return <option key={item[config.valueField]} value={item[config.valueField]}>{item[config.labelField]}</option>
        })}
      </select> 
    </div>
  }

  render() {

    return this.getSelectElement() 

  }

  init () {
    if (!this.localType && !this.hasInit) {
      this.hasInit = true
      ajax({
        url: this.props.data
      }, resp => {
        this.setState({
          data: resp.data
        })
      })
    }
  }

  _onChange (e) {
    console.log(e.target.value)
    return false
  }

  _onSelected (data) {
    let { labelField, valueField } = this.props
    this.refs['fakeInput'].innerHTML = data[labelField]
    $(this.refs['fakeInput']).click()
    this.refs['realInput'].value = data[valueField]
    this.refs['realInput'].dispatchEvent(new Event('input', {bubbles: true}))
  }

  _toggleSelectContent (e) {
    if (!this.hasInit) {
      this.hasInit = true
      let props = {
        data: this.props.data,
        nolink: true,
        onItemClick: this._onSelected.bind(this),
        textField: this.props.labelField
      }
      render(<TreeLikeUI {...props} />, this.refs.list)
    }

    $(this.refs.list).slideToggle('fast')
  }

}

export default SelectBox

