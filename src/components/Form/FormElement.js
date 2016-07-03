import React, { Component, PropTypes } from 'react';
import Option from './Option'
import SelectBox from './SelectBox'
import Password from './Password'
import Number from './Number'

class FormElement extends Component {

  static propTtypes = {
    config: React.PropTypes.object.isRequired,
    value: React.PropTypes.any,
    type: React.PropTypes.string
  }

  getFormElementByType () {
    let config = this.props.config

    let editType = this.props.type
    if ('create' === editType && config.createHidden || 'edit' === editType && config.editHidden) {
      return <virtual></virtual>
    }

    if ('edit' === editType && config.readonly) {
      Element = <p className="form-control-static">{this.props.value}</p>
    }

    let Element = <input type="text" name={config.name} className="form-control" defaultValue={this.props.value || config.value} />

    if (config.type && 'text' !== config.type) {
      let props = {
        config: config,
        value: this.props.value
      }

      switch (config.type) {
        case 'boolean': // radio button
          Element = <Option type="radio" {...props} />
          break
        case 'option': // checkbox
          Element = <Option type="checkbox" {...props} />
          break
        case 'select':
          Element = <SelectBox {...props} />
          break
        case 'password':
          Element = <Password {...props} />
          break
        case 'number':
          Element = <Number {...props} />
          break
      }
    }

    return (
      <div className="form-group">
        <label className="control-label col-sm-4">{config.title}</label>
        <div className="col-sm-6">
          {Element}
          {config.helpText && <span className="help-block">{config.helpText}</span>}
        </div>
      </div>)
  }

  render () {

    return this.getFormElementByType()

  }

}

export default FormElement

