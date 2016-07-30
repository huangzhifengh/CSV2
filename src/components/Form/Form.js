import React, { Component, PropTypes } from 'react';
import DataSource from '../DataSource'
import Element from './Element'

class Form extends Component {

  static propTypes = {
    fields: PropTypes.array.isRequired,
    data: PropTypes.object,
    type: PropTypes.string,
    onChange: PropTypes.func,
    dataSource: PropTypes.object,
  }

  constructor (props) {
    super(props)

    this.dataSource = (props.dataSource instanceof DataSource) ? props.dataSource : new DataSource(props.dataSource)
    this.elements = []
    this.formData = _.extend({}, props.data)
    this._data_ = {}
    if ('update' === props.type) {
      this._data_[this.dataSource.idField] = props.data[this.dataSource.idField]
    }

    this.state = {
      remoteData: {}
    }
  }

  render() {
    _.extend(this.formData, this.state.remoteData)

    let { fields, type } = this.props
    fields = $.extend(true, [], fields)
    fields.slice(-1)[0].command && fields.pop()

    this.elements = [] // reset
    return <form className="form-horizontal">
      {fields.map((config, index) => {
        return <Element 
          ref={el => el && this.elements.push(el)}
          key={index} 
          mode={type} 
          {...config}
          formData={this.formData}
          update={::this.update}
        />
      })}
    </form>
  }

  componentDidMount () {
    if ('update' === this.props.type) {
      this.dataSource.readDefault(resp => {
        resp && this.setState({remoteData: resp.data ? resp.data: resp})
      })
    }
  }

  update (field, value, isDefault) {
    field && (
      (
        (
          isDefault && _.isUndefined(this._data_[field])
        ) || !isDefault
      ) && (this._data_[field] = value)
    )
  }

  submit (type, callback) {
    let length = this.elements.length
    let isValid = true
    for (let i = 0; i < length; i++) {
      let el = this.elements[i]
      isValid = (el ? el.validate() : true) && isValid
    }
    if (isValid) {
      this.dataSource[type || 'save'](_.extend({}, this._data_), callback)
    }
  }
}

export default Form

