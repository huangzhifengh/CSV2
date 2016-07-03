import React, { Component, PropTypes } from 'react';
import FormElement from '../Form/FormElement'

class Form extends Component {

  constructor (props) {
    super(props)

    this.configMap = this._createConfigMap(this.props.columns)

    this.isValid = true
  }

  static propTypes = {
    columns: React.PropTypes.array.isRequired,
    data: React.PropTypes.object,
    type: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  render() {

    let columns = $.extend(true, [], this.props.columns)
    columns.slice(-1)[0].command && columns.pop()
    let data = this.props.data

    return (
      <form className="form-horizontal" onChange={this._onChange.bind(this)} data-id={data.id}>
        {columns.map(config => {
          return <FormElement type={this.props.type} config={config} value={data[config.name]} key={Math.random()} />
        })}
      </form>
    )

  }

  _verify (e) {
    let name = e.target.name
    let value = e.target.value
    let config = this.configMap[name]
    let isValid = config.pattern ? config.pattern.test(value) : (config.validation ? config.validation(value) : true)
    this.isValid = this.isValid && isValid
    let $formGroup = $(e.target).closest('.form-group')
    isValid ? $formGroup.removeClass('has-error') : $formGroup.addClass('has-error')

    return this.isValid
  }

  _onChange (e) {
    this._verify(e)
    this.props.onChange && this.props.onChange(e)
  }

  _createConfigMap (config) {
    let o = {}
    config.forEach(item => {
      if (item.name) {
        o[item.name] = item
      }
    })
    return o
  }

}

export default Form

