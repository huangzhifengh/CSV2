import React, { Component, PropTypes } from 'react';
import Validator from '../Validator'
import Option from './Elements/Option'
import SelectBox from './Elements/SelectBox'
import Password from './Elements/Password'
import Number from './Elements/Number'

class FormElement extends Component {

  static propTtypes = {
    mode: PropTypes.string, // 编辑模式
    name: PropTypes.string, 
    title: PropTypes.string,
    type: PropTypes.string,
    readonly: PropTypes.bool,
    createHidden: PropTypes.bool,
    editHidden: PropTypes.bool,
    value: PropTypes.any,
    defautlValue: PropTypes.any,
    formData: PropTypes.object,
    update: PropTypes.func,
  }

  constructor (props) {
    super(props)

    this.value = ''

    this.state = {
      isValid: true
    }

    if (props.validation) {
      this.validator = new Validator(props.validation) 
    }
  }

  getNoInputElement (type, props) {
    switch (type) {
      case 'boolean': // radio button
        return Element = <Option type="radio" {...props} />
      case 'option': // checkbox
        return Element = <Option type="checkbox" {...props} />
      case 'select':
        return Element = <SelectBox {...props} />
      case 'password':
        return Element = <Password {...props} />
      case 'number':
        return Element = <Number {...props} />
    }
  }

  getElement () {
    let { mode, type, name, defaultValue, value, formData = {}, format, title, tip, readonly, createHidden, editHidden, update, ...other } = this.props

    this.value = value || (format ? format(formData[name], formData) : formData[name]) || defaultValue;
    // 回写操作
    !_.isUndefined(this.value) && update(name, this.value, _.isUndefined(value))

    let Element = <input type="text" name={name} className="form-control" defaultValue={this.value} />
    if ('create' === mode && createHidden || 'edit' === type && editHidden) { return <empty /> }
    if ('edit' === mode && readonly) { Element = <p className="form-control-static">{this.value}</p> }

    if (type && 'text' !== type) {
      Element = this.getNoInputElement(type, {
        ...other,
        name: name,
        value: this.value,
      })
    }

    return <div className={cx({'form-group': true, 'has-error': !this.state.isValid})} onChange={::this.onChange}>
      <label className="control-label col-sm-4">{title}</label>
      <div className="col-sm-6">
        {Element}
        {tip && <span className="help-block">{tip}</span>}
      </div>
    </div>
  }

  componentWillReceiveProps (nextProps) {
    if(nextProps.validation !== this.props.validation) {
      this.validator = new Validator(nextProps.validation)
    }
  }

  render () {
    return this.getElement()
  }

  validate () {
    let isValid = this.validator ? this.validator.check(this.value, this.props.formData) : true
    // udpate when validation state changed
    if (isValid !== this.state.isValid) {
      this.setState({
        isValid: isValid
      })
    }
    return isValid
  }

  onChange (e) {
    let { type, onChange, update, name } = this.props
    let value = e.target.value

    if ('number' === type) {
      value = Number(value)
    }

    this.value = value
    onChange && onChange(value)
    update(name, value)
    this.validate() 
  }

}

export default FormElement

