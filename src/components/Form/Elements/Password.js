import React, { Component, PropTypes } from 'react';

class Module extends Component {

  static propTtypes = {
    name: React.PropTypes.string,
    value: React.PropTypes.oneOfType([PropTypes.numeric, PropTypes.string]),
  }

  render () {
    let { name, value} = this.props

    return <input type="password" name={name} className="form-control" defaultValue={value} />

  }

}

export default Module

