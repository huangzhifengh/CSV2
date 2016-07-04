import React, { Component, PropTypes } from 'react';
import FormElement from './FormElement'
import DataSource from '../DataSource'

class Form extends Component {

  static propTypes = {
    fields: React.PropTypes.array.isRequired,
    data: React.PropTypes.object,
    type: React.PropTypes.string,
    onChange: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.configMap = this._createConfigMap(this.props.fields)
    this.dataSource = new DataSource()

    this.isValid = true
  }

  render() {

    let fields = $.extend(true, [], this.props.fields)
    fields.slice(-1)[0].command && fields.pop()
    let data = this.props.data || {}

    return (
      <form className="form-horizontal" onChange={this._onChange.bind(this)} data-id={data.id}>
        {fields.map(config => {
          return <FormElement type={this.props.type} config={config} value={data[config.name]} key={Math.random()} />
        })}
      </form>
    )
  }

  componentDidMount () {
    this.dataSource.read(data => {
      data && this.setState({data})
    })
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

